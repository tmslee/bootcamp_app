const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const args = process.argv.splice(2);
const values = [`${args[0]}`];

pool.query(
"SELECT DISTINCT t.name, c.name AS cohort FROM assistance_requests ar JOIN teachers t ON t.id = ar.teacher_id JOIN students s ON s.id = ar.student_id JOIN cohorts c ON c.id = s.cohort_id WHERE c.name = $1 ORDER BY t.name;"
, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort}: ${user.name}`);
  })
}).catch(err => console.error('query_error', err.stack));

