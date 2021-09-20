const Product = require("./Product");
const log = require("npmlog");

module.exports = async (request, response) => {
  try {
    const { codigo } = request.params;

    const product = await Product.findOne(
      { codigo, ativo: true },
      "-_id codigo nome cnpj"
    ).exec();

    return response.status(200).json({ produto: product });
  } catch (error) {
    log.error(error);

    return response.status(500).json({ error: "Erro inesperado." });
  }
};
