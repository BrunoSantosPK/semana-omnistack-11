const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;

/*
Para acessar as querys: request.query
Para acessar route param: request.param
Para acessar body: request.body
*/

/*
Conexão do banco
Driver: SELECT * FROM...
Query Builder: table("nome").select("*").where()
-> KNEX
*/