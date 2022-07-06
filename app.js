require('dotenv').config();

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
// const session = require('express-session');
const session = require('cookie-session');
const cors = require('cors');

const sequelize = require('./db2');

// app.use(session({
//     secret: 'k(x=zN;86;K(Ea>4',
//     resave: false,
//     saveUninitialized: false
// }));

app.use(session({
    keys: ['k(x=zN;86;K(Ea>4', 'cFE7Q:B>zF#>vcmJ']
}));

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(express.json());
app.use(cors());

const isLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }

    next();
}
 
app.use(require('./routes/index'));
app.use(require('./routes/productos'));
app.use(require('./routes/contacto'));

app.use('/admin', isLogin, require('./routes/admin/productos'));
app.use('/admin', isLogin, require('./routes/admin/categorias'));

app.use('/api', require('./routes/api/categorias'));

app.use(require('./routes/auth'));

app.use((req, res, next) => {
    res.status(404).send('Not found');
});

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    console.log(`http://localhost:${port}`);

    try {
        await sequelize.sync();
        console.log('Sequelize OK');
    } catch(error) {
        console.log('Error de sequelize' + error);
    } 
});