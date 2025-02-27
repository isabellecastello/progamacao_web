const express = require('express');
const router = express.Router();
const Tutorial = require('../models/Tutorial');

// Configurar para receber dados do formulário
router.use(express.urlencoded({ extended: true }));

// Rota para a página inicial
router.get('/', (req, res) => {
    res.render('index', { message: 'Bem-vindo ao Arte em Crochê!' });
});

// Rota para listar tutoriais
router.get('/tutoriais', async (req, res) => {
    try {
        const tutoriais = await Tutorial.find(); // Busca todos os tutoriais no banco de dados
        res.render('tutoriais', { tutoriais }); // Renderiza a view 'tutoriais.ejs' com os dados
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar tutoriais');
    }
});

// Rota para adicionar um novo tutorial
router.post('/tutoriais', async (req, res) => {
    const { titulo, descricao, imagem } = req.body; // Extrai os dados do formulário

    try {
        const novoTutorial = new Tutorial({ titulo, descricao, imagem }); // Cria um novo documento
        await novoTutorial.save(); // Salva o documento no banco de dados
        res.redirect('/tutoriais'); // Redireciona para a lista de tutoriais
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao salvar o tutorial');
    }
});

// Rota para marcar/desmarcar um tutorial como favorito
router.post('/tutoriais/favorito/:id', async (req, res) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id); // Encontra o tutorial pelo ID
        if (!tutorial) {
            return res.status(404).send('Tutorial não encontrado');
        }

        // Alterna o estado de "favorito"
        tutorial.favorito = !tutorial.favorito;
        await tutorial.save(); // Salva as alterações no banco de dados

        res.redirect('/tutoriais'); // Redireciona de volta para a lista de tutoriais
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar o tutorial');
    }
});

// Rota para exibir tutoriais favoritos
router.get('/favoritos', async (req, res) => {
    try {
        const tutoriaisFavoritos = await Tutorial.find({ favorito: true }); // Busca apenas os tutoriais favoritos
        res.render('favoritos', { tutoriais: tutoriaisFavoritos }); // Renderiza a view de favoritos
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar tutoriais favoritos');
    }
});
router.get('/padroes', (req, res) => {
    res.render('padroes');
});

router.get('/contato', (req, res) => {
    res.render('contato');
});

module.exports = router;