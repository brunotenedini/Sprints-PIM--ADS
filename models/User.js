const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Garante que o email seja único
        validate: {
            isEmail: true // Validação de formato de email
        }
    },
    senha: {
        type: Sequelize.STRING(255), // Aumenta o tamanho para armazenar a hash
        allowNull: false,
    },
});

// Criar tabela
User.sync();

// User.sync({ alter:true })

module.exports = User;