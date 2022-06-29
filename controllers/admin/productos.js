const connection = require('../../db');
const sharp = require('sharp');

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
    // console.log(req.body, req.file);
    // sharp(req.file.buffer).resize(300).toFile('uploads/imagen.jpg');
    connection.query('INSERT INTO productos SET ?', {
        codigo: req.body.codigo, 
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        categoria_id: req.body.categoria
    }, (error) => {
        if (error) { throw error }

        sharp(req.file.buffer).resize(300).toFile(`./public/uploads/producto_${req.body.codigo}.jpg`);

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
    connection.query('UPDATE productos SET ? WHERE codigo = ?', [ { nombre: req.body.nombre, descripcion: req.body.descripcion, categoria_id: req.body.categoria }, req.body.codigo ], async error => {
        if (error) { throw error }

        if (req.file) {
            await sharp(req.file.buffer).resize(300).toFile(`./public/uploads/producto_${req.body.codigo}.jpg`);
            res.redirect('/admin/productos');
        } else {
            res.redirect('/admin/productos');
        }
    });
}

module.exports.delete = (req, res) => {
    connection.query('DELETE FROM productos WHERE codigo = ?', [ req.params.codigo ], error => {
        if (error) { throw error }

        res.redirect('/admin/productos');
    });
}