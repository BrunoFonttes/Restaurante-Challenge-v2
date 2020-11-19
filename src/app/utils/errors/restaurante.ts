
import { CustomError } from '.'

export class RestauranteErrors {
  private message: string
  constructor (message) {
    this.message = message
  }

  public AlreadyExists (): CustomError {
    return new CustomError(this.message, 'ALREADY_EXISTS')
  }

  public Disabled (): CustomError {
    return new CustomError(this.message, 'DISABLED')
  }

  public NotFound (): CustomError {
    return new CustomError(this.message, 'NOT_FOUND')
  }

  public HorarioDeFuncionamentoNaoPermitido(): CustomError {
    return new CustomError(this.message, 'HORARIO_NAO_PERMITIDO')
  }
}
