const crypto = require("crypto");

module.exports = function gerarId() {
    return crypto.randomBytes(4).toString("HEX");
}