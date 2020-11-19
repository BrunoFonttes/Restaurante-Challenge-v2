
import express from 'express'
import { restauranteService } from '../../services'
import { appLogger } from '../../config/logger'

export class Restaurante {
  public router: express.Router
  public privateRouter: express.Router

  public constructor(
    private inputValidator,
    private responseHandler,
    private requestSchema,
    private responseSchema,
  ) {
    this.router = express.Router()
    this.routes(this.router)
  }
  private routes(router): void {
    router.post('/',
      this.inputValidator(this.requestSchema.post.body, 'body'),
      async (req, res, next) => {
        try {
          const { nome, endereco, foto, horarioDeFuncionamento } = req.body
          const restaurante = await restauranteService.create(nome, endereco, foto, horarioDeFuncionamento)

          req['preBody'] = restaurante
          next(null)
        } catch (err) {
          next(err)
        }
      },
      this.inputValidator(this.responseSchema.post.body, 'preBody'),
      this.responseHandler()
    )

    router.get('/',
      async (req, res, next) => {
        try {
          const lojas = await restauranteService.listAll()
          req['preBody'] = lojas
          next(null)
        } catch (err) {
          next(err)
        }
      },
      this.inputValidator(this.responseSchema.get.body, 'preBody'),
      this.responseHandler()
    )

    router.put('/:id',
      this.inputValidator(this.requestSchema.put.params, 'params'),
      this.inputValidator(this.requestSchema.put.body, 'body'),
      async (req, res, next) => {
        try {
          const { id } = req.params
          const { nome, endereco, foto, horarioDeFuncionamento } = req.body
          await restauranteService.update(id, nome, endereco, foto, horarioDeFuncionamento)
          next(null)
        } catch (err) {
          next(err)
        }
      },
      this.responseHandler()
    )

    router.get('/:id',
      this.inputValidator(this.requestSchema.getById.params, 'params'),
      async (req, res, next) => {
        const { id } = req.params
        try {
          const loja = await restauranteService.listById(id)
          req['preBody'] = loja
          next(null)
        } catch (err) {
          next(err)
        }
      },
      this.inputValidator(this.responseSchema.getById.body, 'preBody'),
      this.responseHandler()
    )

    router.delete('/:id',
      async (req, res, next) => {
        const { id } = req.params
        try {
          const res = await restauranteService.delete(id)
          console.log(res)
          next(null)
        } catch (err) {
          next(err)
        }
      },
      this.responseHandler())
  }
}

