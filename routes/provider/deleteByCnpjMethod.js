const Provider = require("./Provider");
const log = require("npmlog");
const { cnpjValidator } = require("../../utils");

module.exports = async (request, response) => {
  try {
    const { cnpj } = request.params;

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

    const result = await Provider.updateOne(
      { cnpj, ativo: true },
      { ativo: false, ultimaAlteracao: new Date().toISOString() }
    );

    if (result.modifiedCount === 0)
      return response.status(400).json({
        message: `O fornecedor com CNPJ ${cnpj} não foi encontrado.`,
      });

    return response.status(200).json({
      message: `O fornecedor com CNPJ ${cnpj} foi removido com sucesso.`,
    });
  } catch (error) {
    log.error(error);

    return response.status(500).json({ error: "Erro inesperado." });
  }
};
