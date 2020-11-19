
import { httpErrors } from '../config'
import { appLogger} from '../config/logger'
import { CommomErrors } from '../utils/errors'

const sendResponse = (res, status, message) => {
  res.statusMessage = message
  res.status(status)
    .send({
      message: message
    })
}

const errorHandlerRequest = (err, req, res, next) => {
  // WHITELIST PARA CONTORNAR A LIMITAÇÃO DE ENVIO DE HEADER ACCEPT-CHARSET DO SWAGGER-UI
  if (process.env.ENV !== 'DEV' &&
  (process.env.ENV !== 'HML' || req.get('Origin') !== process.env.DOC_ORIGIN)
  && req.get('Accept-Charset') !== 'utf-8') {
    err = new CommomErrors('O valor do header HTTP Accept-Charset deve ser utf-8').BadAcceptHeader()
  }
  if (!req.accepts('application/json')) {
    err = new CommomErrors('O cliente deve suportar receber respostas do tipo application/json').BadAcceptHeader()
  }
  
  appLogger.debug(err)
  //passa para o middleware da rota)
  if (err == null) { next() }

  const error = err instanceof SyntaxError || err instanceof TypeError ? new CommomErrors(err.message).BadRequest() : err
  var httpStatus = httpErrors.get(error.name)

  if (httpStatus === undefined) {
    err = new CommomErrors('Erro interno. Por favor, entrar em contato com a Goomer').InternalError()
    httpStatus = 500
  }

  sendResponse(res, httpStatus, err.message)
}

export { errorHandlerRequest }
