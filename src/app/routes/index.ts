
import express from 'express'
import cors from 'cors'

import { swaggerSpecs } from '../config/documentation'

// import { Produto } from './restaurante/produto/produtoRoutes'
import { Restaurante } from './restaurante/restauranteRoutes'

import {
  restauranteRequest, produtoRequest
} from '../utils/schemas/requests'

import {
  restauranteResponse, produtoResponse
} from '../utils/schemas/responses'

import {
  responseHandler,
  inputValidator
} from '../middlewares'

import { RouterFactory } from '../utils/factory/routerFactory'
import { appLogger } from '../config/logger'
import { CommomErrors } from '../utils/errors'
import { Produto } from './restaurante/produto/produtoRoutes'


const commomDependencies = {
  inputValidator,
  responseHandler
}

const restaurante: Restaurante = RouterFactory(Restaurante, commomDependencies, { req: restauranteRequest, res: restauranteResponse })
const produto: Produto = RouterFactory(Produto, commomDependencies, { req: produtoRequest, res: produtoResponse })

var whitelist = ['*']

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new CommomErrors('Not allowed by CORS').Unauthorized())
    }
  },
  optionsSuccessStatus: 200
}


class Routes {
  public express: express.Application
  public expressNvl2: express.Application
  public constructor() {
    this.express = express()
    this.expressNvl2 = express()
    // this.expressNvl3 = express()
    this.routes()
    // this.getRoutes()
  }

  private routes(): void {
    this.express.get('/health', (req, res) => { res.sendStatus(200) })
    if (process.env.ENV != 'TEST' && process.env.ENV != 'DEV') {
      this.express.use(cors(corsOptions))
    }
    this.express.use(cors())
    this.express.use('/restaurantes',
      this.expressNvl2.use('/', produto.router),
      restaurante.router
    )
    if (process.env.ENV === 'DEV') { this.express.get('/documentation', (req, res) => { res.status(200).json(swaggerSpecs) }) }
  }
}

export default new Routes().express
