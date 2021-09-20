const Provider = require("./Provider");
const log = require("npmlog");
const { cnpjValidator } = require("../../utils");

module.exports = async (request, response) => {
  try {
    const { cnpj, nome } = request.body;

    if (!/^\d{14}$/.test(cnpj.toString())) {
      const error = "O valor informado para o CNPJ deve ter 14 digitos.";

      log.error(error);

      return response.status(400).json({ error });
    }

    if (!cnpjValidator(cnpj)) {
      const error = "O valor informado para o CNPJ é inválido.";

      log.error(error);

      return response.status(400).json({ error });
    }

    let provider = await Provider.findOne({ cnpj, ativo: true }).exec();

    if (!provider)
      return response.status(400).json({
        message: `O fornecedor com CNPJ ${cnpj} não foi encontrado.`,
      });

    if (nome) provider.nome = nome;

    provider.ultimaAlteracao = new Date().toISOString();

    await provider.save();

    return response.status(200).json({
      message: `O fornecedor com CNPJ ${cnpj} foi atualizado com sucesso.`,
    });
  } catch (error) {
    log.error(error);

    if (error.errors && error.errors.nome)
      return response.status(400).json({ error: error.errors.nome.message });

    return response.status(500).json({ error: "Erro inesperado." });
  }
};
