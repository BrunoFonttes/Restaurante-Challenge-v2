import { CommomErrors } from '../utils/errors'
import { appLogger } from '../config/logger'

const inputValidator = (schema, property) => {
  return (req, res, next) => {
  
    const options = { 
      abortEarly: false,
      allowUnknown: true
     }
    
    const { error } = schema.validate(req[property], options)   
    if (error == null) { next(null) }
    else {
      const { message } = error
      const err = new CommomErrors(message.replace(/["]+/g, '')).BadRequest()
      // appLogger.debug(req[property])
      next(err)
    }
  }
}

export { inputValidator }
