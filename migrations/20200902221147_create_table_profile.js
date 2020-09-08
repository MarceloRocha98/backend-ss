
exports.up = function(knex, Promise) {
    return knex.schema.createTable('profile', table => {
        table.increments('id').primary()
        table.integer('userId').references('id').inTable('users').notNull().unique()
        table.string('aboutMe', 1000)
        table.integer('avaliationsPoints').defaultTo(0)
        table.integer('totalAvaliations').defaultTo(0)
  })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('profile')
  
};
