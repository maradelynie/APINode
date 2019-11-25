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
 //------------------------------------------------aluno
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

//------------------------------------------------disciplina
 //show all disciplina 
app.get('/api/disciplina',(req, res) => {
  let sql = "SELECT * FROM disciplina";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
 
//add new disciplina
app.post('/api/disciplina',(req, res) => {
  let data = {Nome_Disciplina: req.body.Nome_Disciplina, Cod_Departamento: req.body.Cod_Departamento};
    let sql = "INSERT INTO disciplina SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//update disciplina
app.put('/api/disciplina/:Cod_Disciplina',(req, res) => {
  let sql = "UPDATE disciplina SET Nome_Disciplina='"+req.body.Nome_Disciplina+"', Cod_Departamento='"+req.body.Cod_Departamento+"' WHERE Cod_Disciplina="+req.params.Cod_Disciplina;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Delete aluno
app.delete('/api/disciplina/:Cod_Disciplina',(req, res) => {
  let sql = "DELETE FROM disciplina WHERE Cod_Disciplina="+req.params.Cod_Disciplina+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//------------------------------------------------professor
 //show all professor 
 app.get('/api/professor',(req, res) => {
  let sql = "SELECT * FROM professor";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
 
//add new professor
app.post('/api/professor',(req, res) => {
  let data = {Nome_Professor: req.body.Nome_Professor, Sobrenome_Professor: req.body.Sobrenome_Professor};
    let sql = "INSERT INTO professor SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//update professor
app.put('/api/professor/:Cod_Professor',(req, res) => {
  let sql = "UPDATE professor SET Nome_Professor='"+req.body.Nome_Professor+"', Sobrenome_Professor='"+req.body.Sobrenome_Professor+"' WHERE Cod_Professor="+req.params.Cod_Professor;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Delete professor
app.delete('/api/professor/:Cod_Professor',(req, res) => {
  let sql = "DELETE FROM professor WHERE Cod_Professor="+req.params.Cod_Professor+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});