
const {
  Joi,
  produtoJoi,
  restauranteJoi,
  promocaoProdutoJoi,
  shared
} = require('./joiParameters')

const idRestaurante = shared.id.description('Identificador do restaurante dentro da aplicação')

const sharedSchema = {
  restaurante: {
    postOrPutBody: Joi.object().keys({
      nome: restauranteJoi.nome,
      endereco: restauranteJoi.endereco,
      foto: restauranteJoi.foto,
      horarioDeFuncionamento: restauranteJoi.horarioDeFuncionamento
    }),
  }
}
const restauranteResponse = {

  post: {
    body: sharedSchema.restaurante.postOrPutBody
  },
  put: {
    body: sharedSchema.restaurante.postOrPutBody
  },
  get: {
    body: Joi.array().items(
      Joi.object().keys({
        id: idRestaurante,
        nome: restauranteJoi.nome,
        endereco: restauranteJoi.endereco,
        foto: restauranteJoi.foto,
        horarioDeFuncionamento: restauranteJoi.horarioDeFuncionamento
      })
    )
  },

  getById: {
    body: Joi.object().keys({
      id: idRestaurante,
      nome: restauranteJoi.nome,
      endereco: restauranteJoi.endereco,
      foto: restauranteJoi.foto,
      horarioDeFuncionamento: restauranteJoi.horarioDeFuncionamento
    })

  }
}
module.exports = {
  restauranteResponse
}
