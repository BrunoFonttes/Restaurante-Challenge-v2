import { pool } from '../config/database'
const query = async (text, params?) => {
    const res = await pool.query(text, params)
    return res
}
export { query }