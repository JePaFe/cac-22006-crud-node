const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hola Express');
});

router.get('/productos', (req, res) => {
    res.send('Listado de productos');
});

router.get('/productos/:codigo', (req, res) => {
    // res.send('Producto: ' + req.params.codigo);
    res.send(`Producto: ${req.params.codigo}`);
});

module.exports = router;