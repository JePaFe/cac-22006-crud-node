const Categoria = require('../../models/Categoria');

module.exports.index = (req, res) => {
    Categoria.findAll().then(categorias => res.json(categorias));
}

module.exports.store = (req, res) => {
    Categoria.create({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    })
    .then(result => res.json(result, 201))
    .catch(error => res.json(error, 422));
}

module.exports.show = (req, res) => {
    Categoria.findByPk(req.params.id).then(categoria => res.json(categoria));
}

module.exports.update = (req, res) => {
    Categoria.update({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }, {
        where: {
            id: req.body.id
        }
    })
    .then(result => res.json(result))
    .catch(error => res.json(error));
}

module.exports.delete = (req, res) => {
    Categoria.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => res.json(result))
    .catch(error => res.json(error));
}