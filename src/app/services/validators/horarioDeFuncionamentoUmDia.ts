import { RestauranteErrors } from "../../utils/errors/restaurante"

const intervaloMinimoFuncionamento = 15

const toHours = (horario) => {
    const horaminuto = horario.split(':')
    return {
        hora: parseInt(horaminuto[0]),
        minuto: parseInt(horaminuto[1])
    }
}

export const validaHorarioDeFuncionamentoUmDia = (horarioUmDia) => {
    const abertura = toHours(horarioUmDia.abertura)
    const fechamento = toHours(horarioUmDia.fechamento)
    const expediente = (fechamento.hora * 60 + fechamento.minuto) - (abertura.hora * 60 + abertura.minuto)
    console.log(expediente)
    if (expediente < intervaloMinimoFuncionamento) {
        throw new RestauranteErrors(`O tempo mínimo de expediente precisa ser de ${intervaloMinimoFuncionamento} minutos`).HorarioDeFuncionamentoNaoPermitido()
    }
}
