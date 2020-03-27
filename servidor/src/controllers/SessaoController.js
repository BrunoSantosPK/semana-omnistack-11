const conexao = require("../database/conection");

module.exports = {
    async login(request, response) {
        const { id } = request.body;

        const ong = await conexao("ongs").where("id", id).select("nome").first();
        if(!ong) {
            return response.status(400).json({ erro: "ONG não cadastrada" });
        }

        return response.json(ong);
    }
};