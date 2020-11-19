import Cabin from 'cabin'
import Pino from 'pino'
import url from 'url'

const isJSON = (value) => {
  try {
    JSON.parse(value)
    return true
  }
  catch (err) { return false }
}

const pino = Pino({
  prettyPrint: process.env.ENV === 'DEV' ? true : false,
  level: (process.env.ENV === 'DEV' || process.env.ENV === 'TEST') ? 'debug' : 'info',
  hooks: {
    logMethod(inputArgs, method) {
      const meta = inputArgs[1]
      const msg = inputArgs[0]

      const platform = meta.app.os.platform
      const type = meta.app.os.type

      delete meta.app
      delete meta.request.http_version
      delete meta.response.http_version


      //retira as query parameter da url
      const path = url.parse(meta.request.url).pathname
      meta.request.url = path
      meta.request.pathParameter = {}

      //retira da url e cria path parameter caso exista
      const decomposedUrl = meta.request.url.split('/')
      for (let i = 0; i <= decomposedUrl.length; i++) {
        if (isNaN(parseInt(decomposedUrl[i])) === false) { //se não for NaN( Not a Number) ou seja, se for um número
          const id = `${decomposedUrl[i - 1]}Id`
          meta.request.pathParameter[id] = decomposedUrl[i]
          decomposedUrl[i] = `:${id}`
        }
      }

      meta.request.url = decomposedUrl.join('/')
      //console.log(meta.request.url)
      //substitui campos muito longos do obj de request por mensagem padrão

      if (isJSON(meta.request.body)) {
        const body = JSON.parse(meta.request.body)
        const bodyKeys = Object.keys(body)
        bodyKeys.forEach((key) => {
          try {
            if ((body[key]).toString().length > 100) {
              body[key] = 'Too long to be logged'
            }
          }
          catch (err) {
            body[key] = 'Bad Key to be logged'
          }
        })
        meta.request.body = body
      }

      meta.request.headers = JSON.stringify(meta.request.headers)
      meta.request.headers = meta.request.headers.replace(/["]+/g, '')

      meta.response.headers = JSON.stringify(meta.response.headers)
      meta.response.headers = meta.request.headers.replace(/["]+/g, '')

      meta.user.platform = platform
      meta.user.type = type

      return method.call(this, {
        msg: msg,
        meta: meta
      });
    }
  }
});

const appLogger = Pino({ level: process.env.ENV === 'DEV' || process.env.ENV === 'TEST' ? 'debug' : 'info', })

const logger = new Cabin({
  capture: false,
  axe: {
    logger: pino
  }
});

export { logger, appLogger }