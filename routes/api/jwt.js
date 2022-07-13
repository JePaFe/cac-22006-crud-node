const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const connection = require('../../db');

router.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
        connection.query('SELECT * FROM usuarios WHERE email = ?', [ req.body.email ], async (error, results) => {
            if (error) { throw error }

            if (results.length == 0) {
                res.json({ error: 'El correo y/o contraseña son incorrectos - 1' });
            } else if ((await bcryptjs.compare(req.body.password, results[0].password)) == false) {
                res.send({ error: 'El correo y/o contraseña son incorrectos - 2' });
            } else {
                const payload = { user_id:  results[0].id }
                const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d' });

                res.json({ token });
            }
        });
    } else {
        res.json({ error: 'El correo y/o contraseña son incorrectos - 3' });
    }
});

const isJWTLogin = (req, res, next) => {
    let token = req.headers['authorization'];
    // console.log(token)

    if (!token) {
        return res.sendStatus(401);
    } else {
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error) {
                return res.sendStatus(401);
            } else {
                console.log(decoded);
                next();
            }
        })
    }
}

router.get('/perfil', isJWTLogin, (req, res) => {
    res.json({ perfil: { name: 'Juan' } });
});

module.exports = router;