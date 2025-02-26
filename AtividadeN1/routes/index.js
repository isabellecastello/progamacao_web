const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/tutoriais', (req, res) => {
    res.render('tutoriais');
});

router.get('/padroes', (req, res) => {
    res.render('padroes');
});

router.get('/contato', (req, res) => {
    res.render('contato');
});

module.exports = router;