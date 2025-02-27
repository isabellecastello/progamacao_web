const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const app = express();

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/crocheDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Para processar dados do formulário
app.use(methodOverride('_method')); // Configura o method-override

// Rotas
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
const tutoriaisRouter = require('./routes/tutoriais');
app.use('/tutoriais', tutoriaisRouter);
const Tutorial = require('./models/Tutorial');

async function inicializarTutoriais() {
    const tutoriaisExistentes = await Tutorial.countDocuments();
    if (tutoriaisExistentes === 0) {
        await Tutorial.insertMany([
            { titulo: "Blusa de Crochê", descricao: "Tutorial passo a passo para fazer uma blusa.", imagem: "/images/blusa.jpg" },
            { titulo: "Tapete Redondo", descricao: "Aprenda a fazer um tapete de crochê redondo.", imagem: "/images/tapete.jpg" }
        ]);
        console.log("Tutoriais iniciais adicionados!");
    }
}
inicializarTutoriais();

module.exports = app;