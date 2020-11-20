import { RestauranteErrors } from '../utils/errors/restaurante'
import { CustomError, CommomErrors } from '../utils/errors'
import { appLogger } from '../config/logger';
import { query } from '../database';
import { ProdutoData } from '../utils/schemas/produto-data';
import { ProdutoErrors } from '../utils/errors/produto';

export class ProdutoService {
	public constructor() {

	}
	public create = async (idRestaurante, nome, foto: string, preco, categoria): Promise<ProdutoData> => {
		try {
			const newProduto = {
				idRestaurante: idRestaurante,
				nome: nome,
				foto: foto,
				preco: preco,
				categoria: categoria
			}
			const { rows } = await query(
				`INSERT INTO produto(id_restaurante,nome,foto,preco,categoria )
        VALUES($1,$2,$3,$4,$5) 
        RETURNING *`,
				Object.values(newProduto))
			const row = rows[0]
			const produto: ProdutoData = {
				id: row.id,
				idRestaurante: row.id_restaurante,
				nome: row.nome,
				foto: row.foto.toString(),
				preco: row.preco,
				categoria: row.categoria
			}
			return produto
		} catch (err) {
			if (err.code === '23505') {
				const error = new ProdutoErrors('Erro ao cadastrar um produto já existente').AlreadyExists()
				throw error
			}
			appLogger.debug(err)
			throw new CustomError('Erro ao criar produto no bd', "Erro interno")
		}
	}

	public listById = async (idProduto): Promise<ProdutoData> => {
		const { rows } = await query(`
			SELECT produto.id_restaurante, produto.id, restaurante.nome as restaurante, produto.nome, produto.foto, produto.preco, produto.categoria FROM produto 
			INNER JOIN restaurante
			ON produto.id_restaurante=restaurante.id
			WHERE produto.id=$1`
			, [idProduto])
		if (rows.length === 0) {
			throw new RestauranteErrors('Produto não encontrado').NotFound()
		}
		const row = rows[0]
		const produto: ProdutoData = {
			id: row.id,
			idRestaurante: row.id_restaurante,
			restaurante: row.restaurante,
			nome: row.nome,
			foto: row.foto.toString(),
			preco: row.preco,
			categoria: row.categoria
		}
		return produto
	}

	public delete = async (id) => {
		const res = await query('DELETE FROM produto WHERE id=$1', [id])
		if (res.rowCount === 0) {
			throw new ProdutoErrors('Produto não encontrado').NotFound()
		}
	}

	public listByRestaurante = async (idRestaurante): Promise<ProdutoData> => {
		const { rows } = await query(`
		SELECT * FROM produto 
		WHERE id_restaurante=$1`, [idRestaurante])
		const produtos: ProdutoData = rows.map(row => {
			return {
				id: row.id,
				idRestaurante: row.id_restaurante,
				nome: row.nome,
				foto: row.foto.toString(),
				preco: row.preco,
				categoria: row.categoria
			}
		})
		appLogger.debug(produtos)
		return produtos
	}
	public listAll = async (): Promise<ProdutoData> => {
		const { rows } = await query(`
		SELECT produto.id, restaurante.nome AS restaurante, produto.nome, produto.foto, produto.preco, produto.categoria, produto.id_restaurante FROM produto 
		INNER JOIN restaurante
		ON produto.id_restaurante=restaurante.id
		`)
		appLogger.debug(rows)
		const produtos: ProdutoData = rows.map(row => {
			return {
				id: row.id,
				idRestaurante: row.id_restaurante,
				restaurante: row.restaurante,
				nome: row.nome,
				foto: row.foto.toString(),
				preco: row.preco,
				categoria: row.categoria
			}
		})
		appLogger.debug(produtos)
		return produtos
	}

	public update = async (idProduto, nome, foto: string, preco, categoria): Promise<void> => {
		try {
			const newProduto = {
				nome: nome,
				foto: foto,
				preco: preco,
				categoria: categoria
			}
			const { rows } = await query(`
        UPDATE produto 
        SET nome = $2,
          foto = $3,
          preco = $4,
          categoria = $5
        WHERE id=$1 RETURNING *`,
				[idProduto].concat(Object.values(newProduto)))
			if (rows.length === 0) {
				throw new RestauranteErrors('Produto não encontrado').NotFound()
			}
		}
		catch (err) {
			if (err.code === '23505') {
				throw new RestauranteErrors('Os dados informados já pertencem a outro produto').AlreadyExists()
			}
			if (err.name === 'NOT_FOUND') {
				throw err
			}
			appLogger.debug(err)
			throw new CustomError('Erro ao atualizar produto no bd', "Erro interno")
		}
	}

}