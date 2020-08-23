// Update with your config settings.

module.exports = {


    client: 'postgresql',
    connection: {
      // database: 'services',
      host: 'ec2-3-214-4-151.compute-1.amazonaws.com',
      
      database: process.env.DATABASE_NAME ||'services',
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
