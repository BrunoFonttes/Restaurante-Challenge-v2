import httpStatus from 'http-status-codes'
 
const httpErrors = new Map()

// Erros internos
httpErrors.set('INTERNAL_ERROR', httpStatus.INTERNAL_SERVER_ERROR)
httpErrors.set('UNAUTHORIZED',httpStatus.UNAUTHORIZED)

// Erros sintaticos nos jsons
httpErrors.set('BAD_REQUEST', httpStatus.BAD_REQUEST)
httpErrors.set('BAD_GATEWAY', httpStatus.BAD_GATEWAY)
httpErrors.set('BAD_ACCEPT_HEADER', httpStatus.NOT_ACCEPTABLE)

//Erros de negocio
httpErrors.set('NOT_FOUND', httpStatus.NOT_FOUND)
httpErrors.set('ALREADY_EXISTS', httpStatus.UNPROCESSABLE_ENTITY)
httpErrors.set('DISABLED', httpStatus.UNPROCESSABLE_ENTITY)
httpErrors.set('HORARIO_NAO_PERMITIDO', httpStatus.UNPROCESSABLE_ENTITY)

export { httpErrors }
