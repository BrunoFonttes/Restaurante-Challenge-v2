const {
  Joi,
  restauranteJoi,
  shared,
  produtoJoi
} = require('./joiParameters')

const idRestaurante = Joi.object().keys({
  id: shared.id.description('Identificador do restaurante dentro da aplicação')
})
const idProduto = Joi.object().keys({
  id: shared.id.description('Identificador do produto dentro da aplicação')
})

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
    params: idRestaurante
  },
  getById: {
    params: idRestaurante
  },
  delete: {
    params: idRestaurante
  }
}

const produtoRequest = {
  post: {
    body: sharedSchema.produto.postOrPutBody,
    params: idProduto
  },
  put: {
    body: sharedSchema.produto.postOrPutBody,
    params: idProduto
  },
  getById: {
    params: idProduto
  }
}
module.exports = {
  restauranteRequest,
  produtoRequest
}
