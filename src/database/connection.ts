import { createPool, Pool } from 'mysql2/promise';

export const connect = async (): Promise<Pool> => {
    
    console.log(`CONNECTING TO DATA BASE`)

    const connection = await createPool({
        host: process.env.MYSQLDB_HOST ,
        user: process.env.MYSQLDB_USER,
        password: process.env.MYSQLDB_ROOT_PASSWORD,
        database: process.env.MYSQLDB_DATABASE,
        connectionLimit: 10
    });
    
    console.log(`CONNECTED TO DATA BASE2`)

    return connection;

}