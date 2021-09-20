const Product = require("./Product");
const log = require("npmlog");

module.exports = async (request, response) => {
  try {
    const { codigo } = request.params;

    const result = await Product.updateOne(
      { codigo, ativo: true },
      { ativo: false, ultimaAlteracao: new Date().toISOString() }
    );

    if (result.modifiedCount === 0)
      return response.status(400).json({
        message: `O produto com Código ${codigo} não foi encontrado.`,
      });

    return response.status(200).json({
      message: `O produto com Código ${codigo} foi removido com sucesso.`,
    });
  } catch (error) {
    log.error(error);

    return response.status(500).json({ error: "Erro inesperado." });
  }
};
