module.exports = {
  up (queryInterface, Sequelize) {
    const sql = `
      create type user_role as enum ('USER', 'ADMIN');

      create table users (
        id serial primary key, 
        name varchar(255) not null check (char_length(name) > 0) unique,
        role user_role default 'USER',
        password varchar(255) not null,
        "createTime" timestamp with time zone default now(),
        email varchar(255)
      );
    `
    return queryInterface.sequelize.query(sql, { raw: true })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('users')
  }
}
