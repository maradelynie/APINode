const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors(''));

//connection config
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node',
    //port: 3306,
    //ssl: true
});
//routes
//show all
async function apiGet(){
  app.get('/project',(req, res) => {
    let sql = "SELECT * FROM projetos";
    let ask = connection.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });
}

//add new 
async function apiPost(){
  app.post('/project',(req, res) => {
      let data = {name: req.body.name, description: req.body.description, web_url: req.body.web_url, html_url: req.body.html_url, icon: req.body.icon};
        let sql = "INSERT INTO projetos SET ?";
      let ask = connection.query(sql, data,(err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({results})); 
      }); 
    });
}
  //update aluno
  async function apiPut(){
    app.put('/project:id',(req, res) => {
      let sql = "UPDATE `projetos` SET `name`='"+req.body.name+"',`description`='"+req.body.description+"',`web_url`='"+req.body.web_url+"',`html_url`='"+req.body.html_url+"',`icon`='"+req.body.icon+"' WHERE id='"+req.params.id+"'" ;
      let query = connection.query(sql, (err, results) => {
        if(err) throw err; 
        res.send(JSON.stringify({results}));
      });
    });
  }
  //Delete aluno
  async function apiDelete(){
    app.delete('/project:id',(req, res) => {
      let sql = "DELETE FROM projetos WHERE id="+req.params.id+"";
      let query = connection.query(sql, (err, results) => {
        if(err) throw err;
          res.send(JSON.stringify({results}));
      });
    });
  }

  var port = process.env.PORT || 3333;
  app.listen(port);
