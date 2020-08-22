
exports.up = function(knex, Promise) {
    return knex.schema.table('handleService', table => {
        table.string('why').defaultTo(' ')
    })
};

exports.down = function(knex, Promise) { 
    return knex.schema.table('handleService', table => {
      table.dropColumn('why')
  })
};
