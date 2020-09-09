// Update with your config settings.




/////////////////////////////// Produção :

module.exports = {    


    client: 'postgresql',
    connection: {
      // database: 'services',
      // user:     'postgres',
      // password: '123456'


      host: 'ec2-54-161-58-21.compute-1.amazonaws.com',
      database: 'dbqd7lnd3p350c',
      user:     'qztawannojrhja',
      password: '61fa141ccee2ea7ab26927b7fbc95cfe825f2f013014c6efdac191cb81bb7765'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};



/////////////////////////////////////////// Desenvolvimento:

// module.exports = {    


//   client: 'postgresql',
//   connection: {
//     database: 'services',
//     user:     'postgres',
//     password: '123456'


  
//   },
//   pool: {
//     min: 2,
//     max: 10
//   },
//   migrations: {
//     tableName: 'knex_migrations'
//   }

// };
