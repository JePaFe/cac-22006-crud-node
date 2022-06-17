const connection = require('./db');

module.exports.index = (req, res) => {
    connection.query('SELECT * FROM productos', (error, results) => {
        if (error) { throw error }

        res.render('productos/index', { productos: results });
    })
}

module.exports.create = (req, res) => {
    res.render('productos/create');
}

module.exports.store = (req, res) => {
    connection.query('INSERT INTO productos SET ?', {
        codigo: req.body.codigo, 
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        categoria_id: req.body.categoria
    }, (error) => {
        if (error) { throw error }

        res.redirect('/productos');
    });
}

module.exports.show = (req, res) => {
    connection.query('SELECT * FROM productos WHERE codigo = ?', [ req.params.codigo ], (error, results) => {
        if (error) { throw error }

        res.render('productos/show', { producto: results[0] });
    });
}

module.exports.edit = (req, res) => {
    connection.query('SELECT * FROM productos WHERE codigo = ?', [ req.params.codigo ], (error, results) => {
        if (error) { throw error }

        res.render('productos/edit', { producto: results[0] });
    });
}

module.exports.update = (req, res) => {
    connection.query('UPDATE productos SET ? WHERE codigo = ?', [ { nombre: req.body.nombre, descripcion: req.body.descripcion, categoria_id: req.body.categoria }, req.body.codigo ], error => {
        if (error) { throw error }

        res.redirect('/productos');
    });
}