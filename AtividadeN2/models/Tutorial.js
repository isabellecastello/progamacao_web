const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,
    imagem: String,
    favorito: { type: Boolean, default: false }
});

module.exports = mongoose.model('Tutorial', tutorialSchema);
