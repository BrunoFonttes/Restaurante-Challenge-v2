const JoiBase = require('@hapi/joi')
const JoiDate = require('@hapi/joi-date')

const Joi = JoiBase.extend(JoiDate)

const shared = {
  preco: Joi.string(),
  foto: Joi.string().dataUri(),
  id: Joi.string().guid().description('Identificador da entidade'),
  horario: Joi.date().format('HH:mm')
}
const produtoJoi = {
  nome: Joi.string().min(3).max(50).required().description('Nome do produto').required(),
  foto: shared.foto.description('Imagem do produto').required(),
  preco: shared.preco.required()
}

const promocaoProdutoJoi = {
  descricao: Joi.string().min(3).max(255).description('Descrição da promoção').required(),
  precoPromocional: shared.preco.required(),
  dataInicio: Joi.date().description('Data de inicio da promoção').required(),
  tempoDuracaoEmDias: Joi.number().min(1).description('Tempo em dias de duracao da promoção').required(),
}

const horarioDeFuncionamentoDeUmDia = Joi.object().keys({
  abertura: shared.horario.description('Horário de abertura da loja').required(),
  fechamento: shared.horario.description('Horário de fechamento da loja').required()
})

const horarioDeFuncionamentoJoi = Joi.object().keys({
  segsex: horarioDeFuncionamentoDeUmDia.description('Horario de funcionamento em dias de semana(seg-sex)').required(),
  fimDeSemana: horarioDeFuncionamentoDeUmDia.description('Horario de funcionamento em fins de semana(sab-dom)').required()
})

const restauranteJoi = {
  nome: Joi.string().description('Nome da loja').required(),
  endereco: Joi.string().min(3).description('Endereço da loja').required(),
  foto: shared.foto.description('Imagem da loja').required(),
  horarioDeFuncionamento: horarioDeFuncionamentoJoi.description('Horario de funcionamento do restaurante').required()
}

module.exports = {
  Joi,
  produtoJoi,
  restauranteJoi,
  promocaoProdutoJoi,
  shared
}
