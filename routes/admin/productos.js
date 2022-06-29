const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const controller = require('../../controllers/admin/productos');

router.get('/productos', controller.index);

router.get('/productos/create', controller.create);
router.post('/productos/store', upload.single('imagen'), controller.store);

router.get('/productos/:codigo', controller.show);

router.get('/productos/:codigo/edit', controller.edit);
router.put('/productos/update', upload.single('imagen'), controller.update);

router.delete('/productos/:codigo/delete', controller.delete);

module.exports = router;