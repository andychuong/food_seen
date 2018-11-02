module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/foodspot-dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/foodspot-dev'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}