

const {
  Joi,
  restauranteJoi,
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

const restauranteRequest = {
  post: {
    body: sharedSchema.restaurante.postOrPutBody
  }
  ,
  put: {
    body: sharedSchema.restaurante.postOrPutBody,
    params: Joi.object().keys({
      id: idRestaurante
    })
  },
  getById: {
    params: Joi.object().keys({
      id: idRestaurante
    })
  }
}
module.exports = {
  restauranteRequest
}
