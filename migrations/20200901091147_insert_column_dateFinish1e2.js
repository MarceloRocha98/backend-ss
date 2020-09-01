
exports.up = function(knex, Promise) {
    return knex.schema.table("serviceArea", table => {
        table.string('dateFinish1').notNull().defaultTo('0')
        table.string('dateFinish2').notNull().defaultTo('0')
  })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('serviceArea', table => {
        table.dropColumn('dateFinish1')
        table.dropColumn('dateFinish2')
    })
  
};
