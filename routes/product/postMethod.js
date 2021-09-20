const Provider = require("../provider/Provider");
const Product = require("./Product");
const log = require("npmlog");

module.exports = async (request, response) => {
  try {
    const { codigo, nome, cnpj } = request.body;

    const provider = await Provider.findOne(
      { cnpj, ativo: true },
      "_id"
    ).exec();

    if (!provider)
      return response.status(400).json({
        message: `O fornecedor com CNPJ ${cnpj} não foi encontrado.`,
      });

    const product = new Product({ codigo, nome, cnpj, provider: provider._id });

    await product.save();

    return response
      .status(201)
      .json({ message: "Cadastro do produto realizado com sucesso." });
  } catch (error) {
    log.error(error);

    if (error.code && error.code === 11000)
      return response
        .status(400)
        .json({ error: "O Código informado já foi cadastrado." });

    if (error.errors && error.errors.codigo)
      return response.status(400).json({ error: error.errors.codigo.message });

    if (error.errors && error.errors.nome)
      return response.status(400).json({ error: error.errors.nome.message });

    if (error.errors && error.errors.cnpj)
      return response.status(400).json({ error: error.errors.cnpj.message });

    return response.status(500).json({ error: "Erro inesperado." });
  }
};
