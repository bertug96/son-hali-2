// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'todo-test',
      user:     'postgres',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds',
    },
  },
};
