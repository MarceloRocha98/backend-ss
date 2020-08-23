// Update with your config settings.

module.exports = {


    client: 'postgresql',
    connection: {
      // database: 'services',
      host: 'ec2-3-214-4-151.compute-1.amazonaws.com',
      
      database: process.env.DATABASE_NAME ||'services',
      // user:     'postgres',
      user:     'myrmyhvvzoarxp',
      password: '679f7e9b08a73a67eb5ef1d9859b03e67728965c09f83792a48481bcf3fa46f5'
      // password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};
