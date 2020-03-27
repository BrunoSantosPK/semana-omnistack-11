const conexao = require("../database/conection");

module.exports = {
    async criar(request, response) {
        const { titulo, descricao, valor } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await conexao("casos").insert({
            titulo, descricao, valor, ong_id
        });

        return response.json({ id });
    },

    async listar(request, response) {
        const { page = 1 } = request.query;
        const [cont] = await conexao("casos").count();
        response.header("X-Total-Cont", cont["count(*)"]);
        const casos = await conexao("casos")
            .join("ongs", "ongs.id", "=", "casos.ong_id")
            .select([
                "casos.*", "ongs.nome", "ongs.email", "ongs.whatsapp", "ongs.cidade", "ongs.uf"
            ])
            .limit(5)
            .offset((page - 1) * 5);
        return response.json(casos);
    },

    async deletar(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const caso = await conexao("casos").where("id", id).select("ong_id").first();

        if(caso.ong_id != ong_id) {
            return response.status(401).json({ erro: "Operaçãonão permitida" });
        }

        await conexao("casos").where("id", id).delete();
        return response.status(204).send();
    }
};