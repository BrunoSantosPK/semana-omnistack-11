const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");

const ognController = require("./controllers/OngController");
const casoController = require("./controllers/CasoControle");
const perfilController = require("./controllers/PerfilController");
const sessionController = require("./controllers/SessaoController");

const routes = express.Router();

// Validações
routes.post("/ongs", celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), ognController.criar);

routes.get("/ongs", ognController.listar);

routes.post("/casos", casoController.criar);

routes.get("/casos", celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), casoController.listar);

routes.delete("/casos/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), casoController.deletar);

routes.get("/perfil", celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), perfilController.getCasos);

routes.post("/login", sessionController.login);

module.exports = routes;