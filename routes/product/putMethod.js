const Product = require("./Product");
const Provider = require("../provider/Provider");
const log = require("npmlog");

module.exports = async (request, response) => {
  try {
    const { codigo, nome, cnpj } = request.body;

    let product = await Product.findOne({ codigo, ativo: true }).exec();

    if (!product)
      return response.status(400).json({
        message: `O produto com Código ${codigo} não foi encontrado.`,
      });

    if (nome) product.nome = nome;

    if (cnpj) {
      const provider = await Provider.findOne(
        { cnpj, ativo: true },
        "_id"
      ).exec();

      if (!provider)
        return response.status(400).json({
          message: `O fornecedor com CNPJ ${cnpj} não foi encontrado.`,
        });

      product.cnpj = cnpj;
      product.provider = provider._id;
    }

    product.ultimaAlteracao = new Date().toISOString();

    await product.save();

    return response.status(200).json({
      message: `O produto com Código ${codigo} foi atualizado com sucesso.`,
    });
  } catch (error) {
    log.error(error);

    if (error.errors && error.errors.nome)
      return response.status(400).json({ error: error.errors.nome.message });

    if (error.errors && error.errors.cnpj)
      return response.status(400).json({ error: error.errors.cnpj.message });

    return response.status(500).json({ error: "Erro inesperado." });
  }
};
