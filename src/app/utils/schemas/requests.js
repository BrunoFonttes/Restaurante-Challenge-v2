const {
  Joi,
  restauranteJoi,
  shared,
  produtoJoi
} = require('./joiParameters')

const idRestaurante = shared.id.description('Identificador do restaurante dentro da aplicação').required()

const idProduto = shared.id.description('Identificador do produto dentro da aplicação').required()

const sharedSchema = {
  restaurante: {
    postOrPutBody: Joi.object().keys({
      nome: restauranteJoi.nome,
      endereco: restauranteJoi.endereco,
      foto: restauranteJoi.foto,
      horarioDeFuncionamento: restauranteJoi.horarioDeFuncionamento
    }),
  },
  produto: {
    postOrPutBody: Joi.object().keys({
      nome: produtoJoi.nome,
      foto: produtoJoi.foto,
      preco: produtoJoi.preco,
      categoria: produtoJoi.categoria
    })
  }
}

const restauranteRequest = {
  post: {
    body: sharedSchema.restaurante.postOrPutBody
  },
  put: {
    body: sharedSchema.restaurante.postOrPutBody,
    params: Joi.object().keys({ id: idRestaurante })
  },
  getById: {
    params: Joi.object().keys({ id: idRestaurante })
  },
  delete: {
    params: Joi.object().keys({ id: idRestaurante })
  }
}

const produtoRequest = {
  post: {
    body: sharedSchema.produto.postOrPutBody,
    params: Joi.object().keys({ idRestaurante })
  },
  put: {
    body: sharedSchema.produto.postOrPutBody,
    params: Joi.object().keys({ idProduto })
  },
  delete: {
    params: Joi.object().keys({ idProduto })
  },
  getById: {
    params: Joi.object().keys({ idProduto })
  },
  getByRestaurante: {
    params: Joi.object().keys({ idRestaurante })
  }
}
module.exports = {
  restauranteRequest,
  produtoRequest
}
