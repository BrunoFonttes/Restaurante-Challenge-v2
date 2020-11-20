const {
  Joi,
  restauranteJoi,
  shared,
  produtoJoi
} = require('./joiParameters')

const idRestaurante = Joi.object().keys({
  id: shared.id.description('Identificador do restaurante dentro da aplicação')
})

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
  },
  put: {
    body: sharedSchema.restaurante.postOrPutBody,
    params: idRestaurante
  },
  getById: {
    params: idRestaurante
  },
  delete: {
    params: idRestaurante
  }
}

module.exports = {
  restauranteRequest
}
