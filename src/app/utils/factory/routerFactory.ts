
const RouterFactory = (recurso, commonDependencies, schemas) => {
    const { inputValidator, responseHandler } = commonDependencies
    const responseSchema = schemas.res
    const requestSchema = schemas.req


    const routeInstance = new recurso(
        inputValidator,
        responseHandler,
        requestSchema,
        responseSchema
    )
    return routeInstance
}

export { RouterFactory }