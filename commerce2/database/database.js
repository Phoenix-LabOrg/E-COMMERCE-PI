const mysql = require('mysql');
const { promisify } = require('util');
// con este modulo mysql tengo que utilizar callback ya que no soporta promesas async await
// modulo de callback que me permitira soportar promesas 'util' biblioteca de node /metodo promisify

const { database } = require('/keys');


const pool = mysql
//metodo para obtener la conección
pool.getConnection((err, connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONREFUSED') {
            console.error('DATABASE CONECTION WAS REFUSED');
        }
    }

    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

// Promisify pool querys
pool.query = promisify(pool.query)

module.exports = pool;