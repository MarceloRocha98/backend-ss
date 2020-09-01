
exports.up = function(knex, Promise) {
    return knex.schema.table('serviceArea', table => {
        table.string('dateCheking1').notNull().defaultTo('0')
        table.string('dateCheking2').notNull().defaultTo('0')
  })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('serviceArea', table => {
        table.dropColumn('dateCheking1')
        table.dropColumn('dateCheking2')
    })
  
};
