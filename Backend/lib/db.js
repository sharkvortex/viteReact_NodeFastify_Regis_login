import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,  
    connectionLimit: 10, 
    queueLimit: 0 
});


export const getconnect = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('Database Connected...');
        return conn;
    } catch (error) {
        console.log('Database Connection Failed:', error);
    }
    return conn;
}


export const closeConnection = async (conn) => {
    if (conn) {
        await conn.release(); 
        console.log('Connection Released');
    }
}

export default pool;
