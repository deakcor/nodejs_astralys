const express = require('express');
const sq = require('sqlite3');
const mustache =require('mustache');
const fs=require('file-system')
const app = express();
const router = express.Router();
const router2 = express.Router();

const db_path='/bdd/base.db'
const path = __dirname + '/views/';
const game_path = __dirname + '/build/'
const port = 8080;

var ld="<tbody>";
if (fs.existsSync(game_path + 'index.html')){
  console.log("game loaded")
}else{
  console.log("no game file")
}
if (fs.existsSync(db_path)) {
    var db = new sq.Database(db_path);
db.each("SELECT * FROM scores ORDER BY score DESC", function(err, row) {
    if (err) {
        console.log(err);
    } else {
        ld=ld.concat(`
          <tr>
              <th scope="row">`+row.name+`</th>
              <th>`+row.score+`</th>
            </tr>
          `)
    }
});
  console.log("db loaded")
  }else{
    console.log("No db file")
  }






ld=ld.concat("</tbody>");

router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/', function(req,res){
  res.sendFile(path + 'index.html');
});

router.get('/leaderboard', function(req,res){
  var rData={records:{"ld":ld}}
  var page=fs.readFileSync(path + 'leaderboard.html',"utf8");
  var html=mustache.to_html(page,rData);
  res.send(html);
});

router.get('/game', function(req,res){
  res.sendFile(path + 'game.html');  
});

router2.get('/game-html5', function(req,res){
  if (fs.existsSync(game_path + 'test.html')){
    res.sendFile(game_path + 'index.html');  
  }else{
    res.status(404).send(`Page introuvable ! 
      Vous devez exporter le jeu en version HTML5 en faisant <b>docker-compose up build-game-html</b>
      `);
  }
});

app.use(express.static(path));
app.use('/', router);
app.use(express.static(game_path));
app.use('/', router2);

app.listen(port, function () {
  console.log('Astralys on the move! Go on your browser and type : locahost:8080')
})