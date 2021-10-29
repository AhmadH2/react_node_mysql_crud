const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'employee_schema',
});

app.get('', (req, res) => {
    db.query(
        "SELECT * FROM employees",
        (err,result)=> {
            if(err) res.send(err)
            else res.send(result)
        }
        )
})

app.post('/create', (req, res)=> {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)", 
        [name, age, country, position, wage],
        (err, result) => {
            if(err) {
                res.send(err)
            }
            else {
                db.query('SELECT * FROM employees', (e, r) => res.send(r));
            }
    });
})

app.delete('/:id', (req, res) => {
    db.query(
      "DELETE FROM employees WHERE id = (?)",
      [parseInt(req.params.id)],
      (err, result) => {
        if (err) res.send(err);
        else {
            db.query("SELECT * FROM employees",
            (e, r) => res.send(r)
            )
        }
      }
    );
})

app.put('/:id', (req, res) => {
    db.query(
      'UPDATE employees SET name=?, age=?, country=?, position=?, wage=? WHERE id=?',
      [req.body.name, req.body.age, req.body.country, req.body.position, req.body.wage, req.body.id],
      (err, result) => {
          if(err) res.send(err)
          else {
              db.query('SELECT * FROM employees', (e, r) => res.send(r));
          }
      }
    );
})

app.listen(3010, () => {
    console.log('app is listen to port 3010');
})