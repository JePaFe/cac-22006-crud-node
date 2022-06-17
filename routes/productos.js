const express = require('express');
const router = express.Router();

const controller = require('../controller');

router.get('/productos', controller.index);

router.get('/productos/create', controller.create);
router.post('/productos/store', controller.store);

router.get('/productos/:codigo', controller.show);

router.get('/productos/:codigo/edit', controller.edit);
router.put('/productos/update', controller.update);

module.exports = router;