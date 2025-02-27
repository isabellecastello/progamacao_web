const express = require('express');
const router = express.Router();
const Tutorial = require('../models/Tutorial');

// Listar todos os tutoriais
router.get('/', async (req, res) => {
    const tutoriais = await Tutorial.find();
    res.render('tutoriais', { tutoriais });
});

// Criar um novo tutorial
router.post('/', async (req, res) => {
    const { titulo, descricao, imagem } = req.body;
    await Tutorial.create({ titulo, descricao, imagem });
    res.redirect('/tutoriais');
});

// Editar um tutorial (Formulário de edição)
router.get('/editar/:id', async (req, res) => {
    const tutorial = await Tutorial.findById(req.params.id);
    res.render('editarTutorial', { tutorial });
});

// Atualizar um tutorial
router.post('/editar/:id', async (req, res) => {
    const { titulo, descricao, imagem } = req.body;
    await Tutorial.findByIdAndUpdate(req.params.id, { titulo, descricao, imagem });
    res.redirect('/tutoriais');
});

// Excluir um tutorial
// Rota para excluir um tutorial
router.delete('/:id', async (req, res) => {
    await Tutorial.findByIdAndDelete(req.params.id);
    res.redirect('/tutoriais');
});


// Marcar/Desmarcar favorito
router.post('/favorito/:id', async (req, res) => {
    const tutorial = await Tutorial.findById(req.params.id);
    tutorial.favorito = !tutorial.favorito;
    await tutorial.save();
    res.redirect('/tutoriais');
});
// Rota para exibir os tutoriais favoritos
// Rota para exibir os tutoriais favoritos
router.get('/favoritos', async (req, res) => {
    try {
        const tutoriais = await Tutorial.find({ favorito: true });
        res.render('favoritos', { tutoriais });
    } catch (err) {
        console.error('Erro ao buscar favoritos:', err);
        res.send('Erro ao carregar os favoritos');
    }
});


module.exports = router;
