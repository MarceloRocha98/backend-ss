
exports.up = function(knex, Promise) {
    return knex.schema.table('users', table => {
      table.string('location').notNull().defaultTo('sp')
  })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('users', table => {
        table.dropColumn('location')
    })
  
};
