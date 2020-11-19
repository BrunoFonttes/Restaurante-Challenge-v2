const { Pool } = require('pg')
export const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.DBPASSWORD,
    port: process.env.PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

