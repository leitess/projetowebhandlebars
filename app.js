const path = require('node:path'); 
const express = require("express");
const app = express();

const handlebars = require("express-handlebars").engine;
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, '/public')));

app.get("/", function(req, res){    
  res.render("home")
});

app.get("/consultar", function(req, res){    
  res.render("list")
});

app.get("/atualizar", function(req, res){    
  res.render("update")
});

app.listen(8081, function(){    
  console.log("Servidor Ativo!")
});