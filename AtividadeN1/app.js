const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

// Configuração específica para servir arquivos CSS com o tipo MIME correto
app.use('/stylesheets', express.static(path.join(__dirname, 'public/stylesheets'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// Rotas
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

module.exports = app;