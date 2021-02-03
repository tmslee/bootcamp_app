const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const args = process.argv.splice(2);

pool.query(`
SELECT s.id, s.name, c.name as cohort
FROM students s JOIN cohorts c ON s.cohort_id  = c.id
WHERE c.name LIKE '%${args[0]}%'
LIMIT ${args[1] || 5};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query_error', err.stack));

