const request = require("supertest");
const app = require("../../src/app");
const conect = require("../../src/database/conection");

describe("ONG", () => {
    beforeEach(async() => {
        await conect.migrate.rollback();
        await conect.migrate.latest();
    });

    afterAll(async() => {
        await conect.destroy();
    });

    it("É possível criar uma nova ONG", async() => {
        const response = await request(app)
            .post("/ongs")
            .send({
                "nome": "Salva Vidas 2",
                "cidade": "Cachoeiro de Itapemirim",
                "email": "lambari@gmail.com",
                "uf": "ES",
                "whatsapp": "31983256464"
            });
            // .set() para headers

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveLength(8);
    });
});