const express = require('express');
const router = express.Router();
const Tutorial = require('../models/Tutorial'); // Importa o modelo

// Rota para a página inicial
router.get('/', async (req, res) => {
    try {
        const tutoriais = await Tutorial.find(); // Busca todos os tutoriais
        res.render('index', { title: 'Arte em Crochê', tutoriais });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar os tutoriais');
    }
});

// Rota para a página de tutoriais
router.get('/tutoriais', async (req, res) => {
    try {
        const tutoriais = await Tutorial.find(); // Busca todos os tutoriais
        res.render('tutoriais', { title: 'Tutoriais', tutoriais });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar os tutoriais');
    }
});

module.exports = router;