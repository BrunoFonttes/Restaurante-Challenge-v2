export interface RestaurantData {
    id?: string,
    nome: string,
    endereco: string,
    foto: string,
    horarioDeFuncionamento: HorarioDeFuncionamentoData
}

interface HorarioDeFuncionamentoData {
    segsex: HorarioDeFuncionamentoUmDiaData,
    fimDeSemana: HorarioDeFuncionamentoUmDiaData
}

interface HorarioDeFuncionamentoUmDiaData {
    abertura: string,
    fechamento: string
}