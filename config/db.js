const config = require('../knexfile')
const knex = require('knex')(config)  //passa pro knex as configurações do banco de dados


knex.migrate.latest([config]) //para n precisas ficando manualmente atualizando as mudanças 
module.exports= knex