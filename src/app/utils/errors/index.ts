
class ExtendableError extends Error {
  constructor(message) {
    if (new.target === ExtendableError) { throw new TypeError('Abstract class "ExtendableError" cannot be instantiated directly.') }
    super(message)
    this.name = this.constructor.name
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }
}

class CustomError extends ExtendableError {
  constructor(message, name) {
    super(message)
    this.name = name
  }
}

class CommomErrors {
  private message: string
  constructor(message?) {
    this.message = message
  }

  public InternalError(): CustomError {
    return new CustomError(this.message, 'INTERNAL_ERROR')
  }

  public BadRequest(): CustomError {
    return new CustomError(this.message, 'BAD_REQUEST')
  }

  public Unauthorized(): CustomError {
    return new CustomError(this.message ? this.message : 'Token inválido ou expirado', 'UNAUTHORIZED')
  }

  public BadAcceptHeader(): CustomError {
    return new CustomError(this.message, 'BAD_ACCEPT_HEADER')
  }

  public invalidBase64Img (): CustomError {
    return new CustomError(this.message, 'INVALID_BASE64')
  }
}

export { CommomErrors, CustomError }
