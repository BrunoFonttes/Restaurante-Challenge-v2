import { RestauranteErrors } from '../utils/errors/restaurante'
import { CustomError, CommomErrors } from '../utils/errors'
import { appLogger } from '../config/logger';
import { query } from '../database';

export class RestauranteService {
  public constructor() {

  }
  public create = async (nome, endereco, foto:string, horarioDeFuncionamento): Promise<object> => {
    try {
      const newRestaurante = {
        nome: nome,
        endereco: endereco,
        foto: foto,
        seg_sex_abertura: horarioDeFuncionamento.segsex.abertura,
        seg_sex_fechamento: horarioDeFuncionamento.segsex.fechamento,
        fim_de_semana_abertura: horarioDeFuncionamento.fimDeSemana.abertura,
        fim_de_semana_fechamento: horarioDeFuncionamento.fimDeSemana.fechamento
      }
      const { rows } = await query(
        `INSERT INTO restaurante(nome,endereco, foto,seg_sex_abertura, seg_sex_fechamento, fim_de_semana_abertura, fim_de_semana_fechamento )
        VALUES($1,$2,$3,$4,$5,$6,$7) 
        RETURNING *`,
        Object.values(newRestaurante))
      rows[0].foto = rows[0].foto.toString()
      return rows[0]
    } catch (err) {
      if (err.code === '23505') {
        const error = new RestauranteErrors('Erro ao cadastrar um restaurante já existente').AlreadyExists()
        throw error
      }
      if (err.name === 'INVALID_BASE64') {
        throw err
      }
      appLogger.debug(err)
      throw new CustomError('Erro ao criar restaurante no bd', "Erro interno")
    }
  }

  public listById = async (id): Promise<object> => {
    const { rows } = await query('SELECT * FROM restaurante WHERE id=$1', [id])
    if (rows.length === 0) {
      throw new RestauranteErrors('Restaurante não encontrado').NotFound()
    }
    rows[0].foto = rows[0].foto.toString()
    return rows[0]
  }

  public delete = async (id) => {
    try {
      const res = await query('DELETE FROM restaurante WHERE id=$1', [id])
      if (res.rowCount === 0) {
        throw new RestauranteErrors('Restaurante não encontrado').NotFound()
      }
    }
    catch (err) {
      throw err
    }
  }

  public listAll = async (): Promise<object> => {
    const { rows } = await query('SELECT * FROM restaurante')
    rows.forEach(row => {
      row.foto = row.foto.toString()
    });
    return rows
  }

  public update = async (id, nome, endereco, foto, horarioDeFuncionamento): Promise<object> => {
    try {
      const newRestaurante = {
        nome: nome,
        endereco: endereco,
        foto: foto,
        seg_sex_abertura: horarioDeFuncionamento.segsex.abertura,
        seg_sex_fechamento: horarioDeFuncionamento.segsex.fechamento,
        fim_de_semana_abertura: horarioDeFuncionamento.fimDeSemana.abertura,
        fim_de_semana_fechamento: horarioDeFuncionamento.fimDeSemana.fechamento
      }
      const { rows } = await query(`
        UPDATE restaurante 
        SET nome = $2,
          endereco = $3,
          foto = $4,
          seg_sex_abertura = $5,
          seg_sex_fechamento = $6,
          fim_de_semana_abertura = $7,
          fim_de_semana_fechamento = $8
        WHERE id=$1 RETURNING *`,
        [id].concat(Object.values(newRestaurante)))



      if (rows.length === 0) {
        throw new RestauranteErrors('Restaurante não encontrado').NotFound()
      }
      rows[0].foto = rows[0].foto.toString()
      return rows
    }
    catch (err) {
      if (err.code === '42883') {
        throw new RestauranteErrors('Restaurante não encontrado').NotFound()
      }
      if (err.name === 'INVALID_BASE64') {
        throw err
      }
      if(err.name ==='NOT_FOUND'){
        throw err
      }
      throw new CustomError('Erro ao criar restaurante no bd', "Erro interno")
    }
  }

}