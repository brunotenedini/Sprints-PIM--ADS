const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("bdeasyme", "root", "admin", {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexão com banco de dados realziada com sucesso!");
}).catch(function() {
    console.log("Erro: conexão com banco de dados não realziada com sucesso!");
});

module.exports = sequelize;