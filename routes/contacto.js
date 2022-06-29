const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');

const { check, body, validationResult } = require('express-validator');

router.get('/contacto', (req, res) => {
    res.render('contacto/contacto', { values: {} });
});

router.post('/contacto', [
    body('nombre', 'El nombre es obligatorio y tiene que tener 3 caracteres como minimo.')
        .exists().isLength(3).escape(),
    body('email', 'El correo es obligatorio')
        .exists().isEmail().normalizeEmail(),
    // body('mensaje', 'El mensaje es obligatorio')
    //     .exists().notEmpty().isLength({ max: 3 })
    check('mensaje')
        .exists()
        .notEmpty()
        .withMessage('El mensaje es obligatorio')
        .isLength(3)
        .withMessage('El mensaje tiene que tener 3 carateres o mas')
        .trim().escape()
], (req, res) => {
    const errors = validationResult(req);
    console.log(req.body, errors);
    
    if (errors.isEmpty()) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            secure: false,
            auth: {
                user: '...',
                pass: '...'
            }
        });

        ejs.renderFile(__dirname + '/../views/contacto/correo.ejs', { body: req.body }, (error, html) => {
            if (error) { throw error }

            const options = {
                from: req.body.email,
                to: 'y@y.com',
                subject: 'Nodemailer',
                html: html
            }
    
            transporter.sendMail(options, (error, info) => {
                if (error) { throw error }
        
                console.log(info);
            });
        });

        res.send('Enviando...');
    } else {
        res.render('contacto/contacto', { values: req.body, errors: errors.array() });
    }
});

module.exports = router;
