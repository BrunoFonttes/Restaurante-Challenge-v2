const swaggerJsdoc = require('swagger-jsdoc')
const j2s = require('joi-to-swagger')

/* =============================
1- Schemas de requests
2- Schemas de response
3- Exemplos
4- Parâmetros de url
 ==============================*/


/*(1,2) Schemas de request e response*/
const req = require('../utils/schemas/requests')

const res = require('../utils/schemas/responses')


const joiToSwagger = (joi) => {
  const { swagger } = j2s(joi)
  return swagger
}


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Goomer Restaurantes',
    version: '1.0.0',
    description:
      'Api para realização de operações sobre restaurantes e seus produtos',
    license: {
      name: 'GNU AGPLv3 ',
      url: 'https://choosealicense.com/licenses/agpl-3.0/'
    },
    contact: {
      name: 'Bruno Fontes',
      email: 'brunobfonttes@gmail.com'
    }
  },
  servers: [
    {
      url: process.env.API_HOST
    }
  ],
  components: {
    schemas: {
      Restaurante: joiToSwagger(req.restauranteRequest.post.body),
      Produto: joiToSwagger(req.produtoRequest.post.body)
    },
    responses: {
      RestaurantePost: joiToSwagger(res.restauranteResponse.post.body),
      RestauranteListAll:joiToSwagger(res.restauranteResponse.get.body),
      RestauranteListById:joiToSwagger(res.restauranteResponse.getById.body),

      ProdutoPost: joiToSwagger(res.produtoResponse.post.body),
      ProdutoListAll: joiToSwagger(res.produtoResponse.getAll.body),
      ProdutoListById: joiToSwagger(res.produtoResponse.getById.body), 
      ProdutoListByRestaurant: joiToSwagger(res.produtoResponse.getByRestaurante.body)
    }
  }
}

const options = {
  swaggerDefinition,
  apis: [
    './docs/restaurante/*.yaml',
    './docs/produto/*.yaml',
    './docs/*.yaml',
  ]
}

const swaggerSpecs = swaggerJsdoc(options)

module.exports = { swaggerSpecs, swaggerDefinition, options }