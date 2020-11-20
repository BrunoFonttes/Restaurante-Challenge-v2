import express from 'express'
import { produtoService } from '../../../services'
import { appLogger } from '../../../config/logger'
import { ProdutoData } from '../../../utils/schemas/produto-data'

export class Produto {
  public router: express.Router
  public constructor(
    private inputValidator,
    private responseHandler,
    private requestSchema,
    private responseSchema
  ) {
    this.router = express.Router()
    this.routes(this.router)
  }

  private routes(router): void {
    router.post('/:idRestaurante/produtos',
      this.inputValidator(this.requestSchema.post.body, 'body'),
      this.inputValidator(this.requestSchema.post.params, 'params'),
      async (req, res, next) => {
        try {
          const { nome, foto, preco, categoria } = req.body
          const { idRestaurante } = req.params
          const produto: ProdutoData = await produtoService.create(idRestaurante, nome, foto, preco, categoria)
          req['preBody'] = produto
          next(null)
        } catch (err) {
          appLogger.debug(err)
          next(err)
        }
      },
      this.inputValidator(this.responseSchema.post.body, 'preBody'),
      this.responseHandler()
    )
    router.get('/:idRestaurante/produtos',
      this.inputValidator(this.requestSchema.getByRestaurante.params, 'params'),
      async (req, res, next) => {
        try {
          const { idRestaurante } = req.params
          const produtos: ProdutoData = await produtoService.listByRestaurante(idRestaurante)
          req['preBody'] = produtos
          next(null)
        } catch (err) {
          appLogger.debug(err)
          next(err)
        }
      },
      this.inputValidator(this.responseSchema.getByRestaurante.body, 'preBody'),
      this.responseHandler()
    )

    router.get('/produtos',
      async (req, res, next) => {
        try {
          const produtos: ProdutoData = await produtoService.listAll()
          req['preBody'] = produtos
          next(null)
        } catch (err) {
          appLogger.debug(err)
          next(err)
        }
      },
      this.inputValidator(this.responseSchema.getAll.body, 'preBody'),
      this.responseHandler()
    )
    router.get('/produtos/:idProduto',
      this.inputValidator(this.requestSchema.getById.params, 'params'),
      async (req, res, next) => {
        try {
          const { idProduto } = req.params
          const produtos: ProdutoData = await produtoService.listById(idProduto)
          req['preBody'] = produtos
          next(null)
        } catch (err) {
          appLogger.debug(err)
          next(err)
        }
      },
      this.inputValidator(this.responseSchema.getById.body, 'preBody'),
      this.responseHandler()
    )
    router.put('/produtos/:idProduto',
      this.inputValidator(this.requestSchema.put.params, 'params'),
      this.inputValidator(this.requestSchema.put.body, 'body'),
      async (req, res, next) => {
        try {
          const { idProduto } = req.params
          const { nome, foto, preco, categoria } = req.body
          await produtoService.update(idProduto, nome, foto, preco, categoria)
          next(null)
        } catch (err) {
          appLogger.debug(err)
          next(err)
        }
      },
      this.inputValidator(this.responseSchema.getById.body, 'preBody'),
      this.responseHandler()
    )
    router.delete('/produtos/:idProduto',
      this.inputValidator(this.requestSchema.delete.params, 'params'),
      async (req, res, next) => {
        try {
          const { idProduto } = req.params
          await produtoService.delete(idProduto)
          next(null)
        } catch (err) {
          appLogger.debug(err)
          next(err)
        }
      },
      this.responseHandler()
    )
  }
}