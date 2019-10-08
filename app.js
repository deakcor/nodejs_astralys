const express = require('express');
const db_path=__dirname+'/bdd/base.db'
const sq = require('better-sqlite3');
const mustache =require('mustache');
const fs=require('file-system')
const app = express();
const router = express.Router();
const router2 = express.Router();


const path = __dirname + '/views/';
const game_path = __dirname + '/build/'
const port = 8080;

var ld="<tbody>";
var ld_array=[];
var db; 





if (fs.existsSync(game_path + 'index.html')){
  console.log("game loaded")
}else{
  console.log("no game file")
}
if (fs.existsSync(db_path)) {
    db= new sq(db_path, { verbose: console.log });
    maj_tab()
  console.log("db loaded");

  
  }else{
    console.log("No db file");
  }




function maj_tab(){
ld="<tbody>";
ld_array=[];
var rows=db.prepare('SELECT * FROM scores ORDER BY score DESC')
var array_row=rows.all()
array_row.forEach(function(row) {
  ld_array.push({"name":row.name,"score":row.score});
        ld=ld.concat(`
          <tr>
              <th scope="row">`+row.name+`</th>
              <th>`+row.score+`</th>
            </tr>
          `);
}); 
  ld=ld.concat("</tbody>");
}


router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/', function(req,res){
  res.sendFile(path + 'index.html');
});

//display leaderboard page
router.get('/leaderboard', function(req,res){
  maj_tab()
  var rData={records:{"ld":ld}}
  var page=fs.readFileSync(path + 'leaderboard.html',"utf8");
  var html=mustache.to_html(page,rData);
  res.send(html);
});

//get bdd for godot game
router.get('/leaderboardgd', function(req,res){
  maj_tab()
  res.send(JSON.stringify(ld_array));

});

//del all from bdd
router.get('/delldgd', function(req,res){
  db.prepare('DELETE FROM scores').run();
  res.send(JSON.stringify(true));
  
});


//Post a new score from Godot
router.post('/postld', function(req,res){
  var result=req.query;
  var rep=false;
  console.log(result);
  try{

    db.prepare('INSERT INTO scores (name, score) VALUES (?, ?)').run(result.name,result.score);
    rep=true;
  }catch(error){
    rep=false;
  }finally{
    res.send(JSON.stringify(rep));
    
  }
});

//Display game.html page
router.get('/game', function(req,res){
  res.sendFile(path + 'game.html');  
});

//Run html5 game
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