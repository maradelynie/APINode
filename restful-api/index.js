const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'us-cdbr-iron-east-02.cleardb.net',
  user: 'b707183cdd8e88',
  password: '5fac8f44',
  database: 'heroku_4209a3f1c2ba81c'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
//show all aluno
app.get('/api/aluno',(req, res) => {
  let sql = "SELECT * FROM aluno";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
 
//add new aluno
app.post('/api/aluno',(req, res) => {
  let data = {Nome_Aluno: req.body.Nome_Aluno, Sobrenome_Aluno: req.body.Sobrenome_Aluno};
  let sql = "INSERT INTO aluno SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//update aluno
app.put('/api/aluno/:RA',(req, res) => {
  let sql = "UPDATE aluno SET Nome_Aluno='"+req.body.Nome_Aluno+"', Sobrenome_Aluno='"+req.body.Sobrenome_Aluno+"' WHERE RA="+req.params.RA;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Delete aluno
app.delete('/api/aluno/:RA',(req, res) => {
  let sql = "DELETE FROM aluno WHERE RA="+req.params.RA+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});