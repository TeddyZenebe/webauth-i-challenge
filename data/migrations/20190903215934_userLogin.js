
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl=>{
      tbl.increments();
      tbl.string('userName', 128).notNullable();
      tbl.string('password', 128).unique().notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users')
};
