const gerarId = require("../../src/utils/gerarId");

describe("Gerar um Id único", () => {
    it("Espero que gere um id único", () => {
        const id = gerarId();
        expect(id).toHaveLength(8);
    });
});