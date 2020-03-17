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
    user: 'maraoliv_crud',
    password: 'feelFreeToFarm',
    database: 'maraoliv_APINode923756',
    //port: 3306,
    //ssl: true

});
//routes
//show all

  app.get('/project',(req, res) => {
    let sql = "SELECT * FROM projetos";
    let ask = connection.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify(results));
    });
  });


//add new 

  app.post('/project',(req, res) => {
      let data = {name: req.body.name, description: req.body.description, web_url: req.body.web_url, html_url: req.body.html_url, icon: req.body.icon};
        let sql = "INSERT INTO projetos SET ?";
      let ask = connection.query(sql, data,(err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({results})); 
      }); 
    });

  //update aluno
 
    app.put('/project:id',(req, res) => {
      let sql = "UPDATE `projetos` SET `name`='"+req.body.name+"',`description`='"+req.body.description+"',`web_url`='"+req.body.web_url+"',`html_url`='"+req.body.html_url+"',`icon`='"+req.body.icon+"' WHERE id='"+req.params.id+"'" ;
      let query = connection.query(sql, (err, results) => {
        if(err) throw err; 
        res.send(JSON.stringify({results}));
      });
    });
  
  //Delete aluno
 
    app.delete('/project:id',(req, res) => {
      let sql = "DELETE FROM projetos WHERE id="+req.params.id+"";
      let query = connection.query(sql, (err, results) => {
        if(err) throw err;
          res.send(JSON.stringify({results}));
      });
    });
  

  var port = process.env.PORT || 3333;
  app.listen(port);
