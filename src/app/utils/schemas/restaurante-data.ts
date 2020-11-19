export interface RestaurantData{
    id?:string,
    nome: string,
    endereco: string,
    foto: string,
    horarioDeFuncionamento:{
      segsex: {
        abertura: string,
        fechamento: string
      },
      fimDeSemana: {
        abertura: string,
        fechamento: string
      }
    }
}