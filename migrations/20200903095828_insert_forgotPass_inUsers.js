
exports.up = function(knex, Promise) {
    return knex.schema.table("users", table => {
        table.string('tokenForgot')
        table.string('tokenForgotExp')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.table("users", table => {
        table.dropColumn('tokenForgot')
        table.dropColumn('tokenForgotExp')
    })
};
