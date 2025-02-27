const express = require('express');
const router = express.Router();
const tutorialDAO = require('../dao/TutorialDAO');

router.use(express.urlencoded({ extended: true }));

// Rota para a página inicial
router.get('/', (req, res) => {
    res.render('index', { message: 'Bem-vindo ao Arte em Crochê!' });
});

// Rota para listar tutoriais
router.get('/tutoriais', async (req, res) => {
    const tutoriais = await tutorialDAO.buscarTodos();
    res.render('tutoriais', { tutoriais });
});

// Rota para adicionar um novo tutorial
router.post('/tutoriais', async (req, res) => {
    const { titulo, descricao, imagem } = req.body;
    await tutorialDAO.criar({ titulo, descricao, imagem });
    res.redirect('/tutoriais');
});

module.exports = router;