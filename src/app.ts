
import express from 'express'
import timeout from 'connect-timeout'

import {
  errorHandlerRequest,
  errorHandlerResponse,
} from './app/middlewares'
import routes from './app/routes'
import { logger } from './app/config'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()
    this.middlewares()
  }

  private haltOnTimedout(req, res, next) {
    if (!req.timedout) next()
  }

  private middlewares(): void {
    this.express.enable('etag')
    this.express.set('etag', 'strong')
    this.express.use(logger.middleware)
    this.express.use(express.json())
    if (process.env.ENV != 'TEST') {
      this.express.use(timeout('5s'))
    }
    this.express.use(errorHandlerRequest)
    this.express.use(`/${process.env.ROOT_PATH}`, routes)
    if (process.env.ENV != 'TEST') {
      this.express.use(this.haltOnTimedout) /*se a req demorar + 5 segundos é lançada uma exceção*/
    }
    this.express.use(errorHandlerResponse)
  }

}

export default new App().express





