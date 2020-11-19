import { query } from '../'

import { restaurante } from './restaurante'
import { MigrationData } from './migration-data'
import { setup } from './setup'
const executeQuery = async (queryText, entidade, operation) => {
    await query(queryText)
    console.log(`====================[${entidade}] Migrate ${operation} executado com sucesso====================`)
}

const executeMigration = async (entidade: MigrationData) => {
    let queryText = ''
    if (process.argv[2] === 'up') {
        queryText = entidade.createTableText
    }
    if (process.argv[2] === 'down') {
        queryText = entidade.destroyTableText
    }
    await executeQuery(queryText, entidade.nome, process.argv[2])
}

const run = async()=>{
    await query(setup.text)
    await executeMigration(restaurante)
}

run()
