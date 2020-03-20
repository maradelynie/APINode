const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();         
const router = express.Router();
const port = process.env.PORT || 3333; //porta padrão

//body-parser--------------
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);







//GET ALL-----------------------------------------------------------------
router.get('/', (req, res) =>{
    execSQLQuery('SELECT * FROM Projetos', res);
})

//GET ONE-----------------------------------------------------------------
router.get('/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Projetos' + filter, res);
})

//DELETE ONE-----------------------------------------------------------------
router.delete('/one/:id', (req, res) =>{
    execSQLQuery('DELETE FROM Projetos WHERE ID=' + parseInt(req.params.id), res);
})

//DELETE ALL-----------------------------------------------------------------
router.delete('/all', (req, res) =>{
  execSQLQuery('DELETE FROM Projetos', res);
})

//POST ITEM-----------------------------------------------------------------
router.post('/post', (req, res) =>{
  
  const name = req.body.name;
  const description = req.body.description;
  const web_url = req.body.web_url;
  const html_url = req.body.html_url;
  const icon = req.body.icon;
  
  execSQLQuery(`INSERT INTO Projetos(name, description, web_url, html_url, icon) VALUES ('${name}','${description}','${web_url}','${html_url}','${icon}')`, res);
   
});

//UPDATE ITEM---------------------------------------------------------------
router.put('/up/:id', (req, res) =>{

    const id = parseInt(req.params.id);
    const name = req.body.name;
    const description = req.body.description;
    const web_url = req.body.web_url;
    const html_url = req.body.html_url;
    const icon = req.body.icon;
    
    execSQLQuery(`UPDATE Projetos SET name='${name}', description='${description}', web_url='${web_url}', html_url='${html_url}', icon='${icon}' WHERE ID=${id}`, res);
});




//CONNECTION SETUP----------------------------------------------------------
function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host: 'db4free.net',
        user: 'maraoliveira',
        password: 'FreeToFarmHere',
        database: 'apinode',
        port:3306,
    });
   
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        //console.log('Done.');
    });
  }

//DEV PORT-----------------------------------------------------------------

app.listen(port);
//console.log('Rolling...');