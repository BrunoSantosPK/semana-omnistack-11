const conexao = require("../database/conection");

module.exports = {
    async getCasos(request, response) {
        const ong_id = request.headers.authorization;

        const casos = await conexao("casos").where("ong_id", ong_id).select("*");

        return response.json(casos);
    }
};