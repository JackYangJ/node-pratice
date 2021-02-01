let pg = require('pg');
let conString = 'tcp://postgres:postgre123@localhost:5432/postgres';
let client = new pg.Client(conString);
client.connect();

client.query(
    'INSERT INTO users ' +
    "(name, age) values ($1, $2) " +
    "RETURNING id",
    ['Mike', 39],
    function (err, result) {
      if (err) throw err;
      console.log('Insert ID is ' + result.rows[0].id);
    }
);

client.query(
  'SELECT * FROM users WHERE age < $1',
  [40],
  function(err, result) {
    if (err) throw err;
    console.log(result);
    console.log(result.rows[0].name);
    client.end();
  }
);

