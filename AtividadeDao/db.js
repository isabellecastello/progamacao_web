const mongoose = require('mongoose');

// Conecte ao MongoDB local (ou substitua pela URL do seu MongoDB Atlas se estiver usando a nuvem)
const mongoURI = 'mongodb+srv:<db_username>:isa120907@cluster0.bcgja.mongodb.net/'
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.log('Erro ao conectar ao MongoDB:', err));

module.exports = mongoose;