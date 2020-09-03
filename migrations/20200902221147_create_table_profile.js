
exports.up = function(knex, Promise) {
    return knex.schema.createTable('profile', table => {
        table.increments('id').primary()
        table.string('userId').references('id').inTable('users').notNull()
        table.string('aboutMe', 1000)
        table.integer('avaliationsPoints')
        table.integer('totalAvaliations')
  })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('profile')
  
};
