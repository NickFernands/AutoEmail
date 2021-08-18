//Configurações
const express = require('express');
const app = express();
const morgan = require('morgan');

//Configurações de rotas
const authorsRoutes = require('./api/routes/authorsRoute');
const followsRoute = require('./api/routes/followsRoute');
const postsRoute = require('./api/routes/postsRoute');
const readersRoute = require('./api/routes/readersRoute');

//Logs das rotas no terminal
app.use(morgan('dev'));

//Configurações de body
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Configurações de CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATH');
        return res.status(200).send({})
    }

    next();

});

//Rotas na URL Postman
app.use('/authors', authorsRoutes);
app.use('/follows', followsRoute);
app.use('/posts', postsRoute);
app.use('/readers', readersRoute);


//Rotas utilizadas casos as rotas acimas não estejam acessiveis
app.use((req, res, next) => {
    const error = new Error ('Não Encontrado');
    error.status = 404;
    nexts(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message
        }
    });
});

module.exports = app;