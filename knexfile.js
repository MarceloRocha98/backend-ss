// Update with your config settings.




/////////////////////////////// Produção :

// module.exports = {    


//     client: 'postgresql',
//     connection: {
//       // database: 'services',
//       // user:     'postgres',
//       // password: '123456'


//       host: 'ec2-3-214-4-151.compute-1.amazonaws.com',
//       database: 'd8mt6vvlii53qf',
//       user:     'myrmyhvvzoarxp',
//       password: '679f7e9b08a73a67eb5ef1d9859b03e67728965c09f83792a48481bcf3fa46f5'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }

// };



/////////////////////////////////////////// Desenvolvimento:

module.exports = {    


  client: 'postgresql',
  connection: {
    database: 'services',
    user:     'postgres',
    password: '123456'


  
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};
