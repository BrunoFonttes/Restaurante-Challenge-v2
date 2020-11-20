
import { CustomError } from '.'

class ProdutoErrors {
  private message: string
  constructor (message) {
    this.message = message
  }

  public NotFound (): CustomError {
    return new CustomError(this.message, 'NOT_FOUND')
  }

  public AlreadyExists (): CustomError {
    return new CustomError(this.message, 'ALREADY_EXISTS')
  }

  public Disabled (): CustomError {
    return new CustomError(this.message, 'DISABLED')
  }
}
export { ProdutoErrors }
