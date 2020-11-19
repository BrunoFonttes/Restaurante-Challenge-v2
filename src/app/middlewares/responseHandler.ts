import { appLogger } from "../config/logger"

const responseHandler = () => {
    return (req, res) => {
        switch (req.method) {
            case 'GET':
                appLogger.debug(req['preBody'])
                res.status(200).json(req['preBody'])
                break
            case 'POST':
                res.status(201).json(req['preBody'])
                break
            case 'PUT':
                res.status(204).send()
                break
            case 'PATCH':
                res.status(204).send()
                break
            default:
                res.status(200).send()
                break
        }
    }
}

export { responseHandler }