const gerarId = require("../utils/gerarId");
const conexao = require("../database/conection");

module.exports = {
    async listar(require, response) {
        const ongs = await conexao("ongs").select("*");
        return response.json(ongs);
    },

    async criar(request, response) {
        const { nome, email, whatsapp, cidade, uf } = request.body;
        const id = gerarId();
        

        await conexao("ongs").insert({
            id, nome, email, whatsapp, cidade, uf
        });
        
        return response.json({
            evento: "Semana OmniStack 2020",
            idCadastrado: id
        });
    }
};