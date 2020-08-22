
exports.up = function(knex, Promise) {
    return knex.schema.createTable('payment', table => {
        table.increments('id').primary()
        table.integer('userId').references('id')
            .inTable('users').notNull()
        table.integer('serviceId')
            .references('id').inTable('services').notNull() 
        table.integer('generatedBefore').notNull().defaultTo(0)
        table.integer('payed').notNull().defaultTo(0)
        table.string('barcode')
        table.string('code')
        table.string('dueDate')
        table.string('paymentLink')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('payment')
};
