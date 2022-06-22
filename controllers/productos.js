const connection = require('../db');

module.exports.index = (req, res) => {
    connection.query('SELECT * FROM productos', (error, results) => {
        if (error) { throw error }

        res.render('productos/index', { productos: results });
    })
}

module.exports.show = (req, res) => {
    connection.query('SELECT * FROM productos WHERE codigo = ?', [ req.params.codigo ], (error, results) => {
        if (error) { throw error }

        res.render('productos/show', { producto: results[0] });
    });
}
