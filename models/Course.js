// models/Course.js
const Sequelize = require('sequelize');
const db = require('./db');

const Course = db.define('courses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_curso: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nome_profissional: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    valor: {
        type: Sequelize.STRING, // Pode ser string para permitir valores como "Gratuito"
        allowNull: false,
    },
    imagem_curso: {
        type: Sequelize.STRING, // Armazenará o caminho da imagem
        allowNull: false,
    },
    link_youtube: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: true, // Validação para garantir que é uma URL válida
        }
    },
});

Course.sync(); // Cria a tabela se não existir

module.exports = Course;
