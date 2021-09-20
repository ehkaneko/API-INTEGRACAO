const Product = require("./Product");
const log = require("npmlog");

module.exports = async (request, response) => {
  try {
    const products = await Product.find(
      { ativo: true },
      "-_id codigo nome cnpj"
    ).exec();

    return response.status(200).json({ produtos: products });
  } catch (error) {
    log.error(error);

    return response.status(500).json({ error: "Erro inesperado." });
  }
};
