
const {
  Joi,
  produtoJoi,
  restauranteJoi,
  promocaoProdutoJoi,
  shared
} = require('./joiParameters')

const idRestaurante = shared.id.description('Identificador do restaurante dentro da aplicação')
const idProduto = shared.id.description('Identificador do restaurante dentro da aplicação')

const sharedSchema = {
  restaurante: {
    postOrPutBody: Joi.object().keys({
      id: idRestaurante,
      nome: restauranteJoi.nome,
      endereco: restauranteJoi.endereco,
      foto: restauranteJoi.foto,
      horarioDeFuncionamento: restauranteJoi.horarioDeFuncionamento
    }),
  },
  produto: {
    body: Joi.object().keys({
      idProduto: idProduto,
      idRestaurante: idRestaurante,
      nome: produtoJoi.nome,
      foto: produtoJoi.foto,
      preco: produtoJoi.preco,
      categoria: produtoJoi.categoria
    })
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

const produtoResponse = {
  post: {
    body: sharedSchema.produto.body
  },
  put: {
    body: sharedSchema.restaurante.postOrPutBody
  },
  get: {
    body: Joi.array().items(
      sharedSchema.produto.body
    )
  },

  getById: {
    body: sharedSchema.produto.body

  }
}
module.exports = {
  restauranteResponse,
  produtoResponse
}
