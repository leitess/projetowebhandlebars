const path = require('node:path'); 
const express = require("express");
const bodyParser = require("body-parser");

const agendamento = require("./models/agendamento")
const app = express();

const handlebars = require("express-handlebars").engine;

app.engine("handlebars", handlebars({
  defaultLayout: "main",
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: {
      // Função para fazer operações matemáticas no handlebars
      math: function (lvalue, operator, rvalue) {
          lvalue = parseFloat(lvalue);
          rvalue = parseFloat(rvalue);
          return {
              "+": lvalue + rvalue,
              "-": lvalue - rvalue,
              "*": lvalue * rvalue,
              "/": lvalue / rvalue,
              "%": lvalue % rvalue
          }[operator];
      },
      // Função para fazer comparação de valores no handlebars
      isEqual: function (expectedValue, value) {
          return value === expectedValue;
      }
  }
}))

app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res){    
  res.render("home")
});

app.post('/cadastrar', function(req, res) {
  agendamento.create({
    nome: req.body.nome,
    telefone: req.body.telefone,
    origem: req.body.origem,
    data_contato: req.body.data_contato,
    observacao: req.body.observacao
  }).then(function(){
      console.log("Agendamento cadastrado com sucesso!")
  }).catch(function(erro){
      console.log("Erro: Agendamento não cadastrado!" + erro)
  });

  res.render('home');
});

app.get("/consultar", function(req, res){    
  agendamento.findAll().then(result => {
    res.render('list', { result });
  }).catch((erro) => {
    return res.status(401).json({ error: 'Houve um error'});
  });
});

app.get("/atualizar/:id", function(req, res){    
  agendamento.findOne({ where: { id: req.params.id }}).then((result) => {
    res.render('update', { result });
  }).catch((err) => {
    return res.status(401).json({ error: 'Houve um erro' });
  });
});

app.post("/atualizar", function(req, res){    
  agendamento.update({
    nome: req.body.nome,
    telefone: req.body.telefone,
    origem: req.body.origem,
    data_contato: req.body.data_contato,
    observacao: req.body.observacao
  }, {
    where: {
      id: req.body.id
    }
  }).then(() => {
    res.redirect('/consultar');
  }).catch(function (erro) {
    return res.status(401).json({ error: 'Houve um erro' });
  });
});

app.get("/deletar/:id", function(req, res){    
  agendamento.destroy({
    where: { id: req.params.id }
  }).then(function () {
    res.redirect('/consultar');
  }).catch(function (erro) {
    return res.status(401).json({ error: 'Houve um erro' });
  });
});

app.listen(8081, function(){    
  console.log("Servidor Ativo!")
});