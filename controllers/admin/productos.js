const connection = require('../../db');

module.exports.index = (req, res) => {
    connection.query('SELECT * FROM productos', (error, results) => {
        if (error) { throw error }

        res.render('admin/productos/index', { productos: results, layout: 'layout-admin' });
    })
}

module.exports.create = (req, res) => {
    res.render('admin/productos/create', { layout: 'layout-admin' });
}

module.exports.store = (req, res) => {
    connection.query('INSERT INTO productos SET ?', {
        codigo: req.body.codigo, 
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        categoria_id: req.body.categoria
    }, (error) => {
        if (error) { throw error }

        res.redirect('/admin/productos');
    });
}

module.exports.show = (req, res) => {
    connection.query('SELECT * FROM productos WHERE codigo = ?', [ req.params.codigo ], (error, results) => {
        if (error) { throw error }

        res.render('admin/productos/show', { producto: results[0], layout: 'layout-admin' });
    });
}

module.exports.edit = (req, res) => {
    connection.query('SELECT * FROM productos WHERE codigo = ?', [ req.params.codigo ], (error, results) => {
        if (error) { throw error }

        res.render('admin/productos/edit', { producto: results[0], layout: 'layout-admin' });
    });
}

module.exports.update = (req, res) => {
    connection.query('UPDATE productos SET ? WHERE codigo = ?', [ { nombre: req.body.nombre, descripcion: req.body.descripcion, categoria_id: req.body.categoria }, req.body.codigo ], error => {
        if (error) { throw error }

        res.redirect('/admin/productos');
    });
}

module.exports.delete = (req, res) => {
    connection.query('DELETE FROM productos WHERE codigo = ?', [ req.params.codigo ], error => {
        if (error) { throw error }

        res.redirect('/admin/productos');
    });
}