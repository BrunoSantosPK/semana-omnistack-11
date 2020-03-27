const knex = require("knex");
const config = require("../../knexfile");

const conf = process.env.NODE_ENV == "test" ? config.test : config.development;

const conect = knex(conf);

module.exports = conect;