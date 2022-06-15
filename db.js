const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', // 127.0.0.1
    user: 'root',
    password: '',
    database: 'cac_22006'
});

connection.connect(error => {
    if (error) { throw error }
});

module.exports = connection;

// connection.query('SELECT * FROM productos', (error, results) => {
//     if (error) { throw error }

//     console.log(results);
// });