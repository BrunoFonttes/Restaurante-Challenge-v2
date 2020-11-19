
import { httpErrors } from '../config'
import { CommomErrors } from '../utils/errors'
import { appLogger } from '../config/logger'

const sendResponse = (res, status, message) => {
  res.statusMessage = message //resdon_phrase
  res.status(status)
    .send({
      error: message
    })
}

const errorHandlerResponse = (err, req, res, next) => {
  //valida erros de negocio da aplicação e erros de validação de requisição(request body, parametros de query)
  if (err == null) {
    next(err, req, res, next)
  }

  let httpStatus = httpErrors.get(err.name)
  let error = err
  if (httpStatus === undefined || httpStatus === 'INTERNAL_SERVER_ERROR') {
    appLogger.error(err)
    error = new CommomErrors('Erro interno. Por favor, entrar em contato com a Goomer').InternalError()
    httpStatus = 500
  }
  sendResponse(res, httpStatus, error.message)
}

export { errorHandlerResponse }
