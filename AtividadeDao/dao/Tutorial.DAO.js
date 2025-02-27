const Tutorial = require('../models/Tutorial');

class TutorialDAO {
    // Criar um novo tutorial
    async criar(tutorialData) {
        const tutorial = new Tutorial(tutorialData);
        return await tutorial.save();
    }

    // Buscar todos os tutoriais
    async buscarTodos() {
        return await Tutorial.find();
    }

    // Buscar um tutorial por ID
    async buscarPorId(id) {
        return await Tutorial.findById(id);
    }

    // Atualizar um tutorial por ID
    async atualizar(id, tutorialData) {
        return await Tutorial.findByIdAndUpdate(id, tutorialData, { new: true });
    }

    // Deletar um tutorial por ID
    async deletar(id) {
        return await Tutorial.findByIdAndDelete(id);
    }
}

module.exports = new TutorialDAO();