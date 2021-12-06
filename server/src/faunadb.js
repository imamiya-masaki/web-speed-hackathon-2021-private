// Require the driver
const faunadb = require('faunadb');
let secret = require('./secret.json');
// import secret from './secret.json';
// Acquire the secret and optional endpoint from environment variables
secret = secret.FAUNADB_SECRET

// Instantiate a client
const faunaDB = new faunadb.Client({
  secret: secret
})

const q = faunaDB.query

return { faunaDB, q }