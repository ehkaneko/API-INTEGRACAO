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

    const provider = await Provider.findOne(
      { cnpj, ativo: true },
      "-_id cnpj nome"
    ).exec();

    return response.status(200).json({ fornecedor: provider });
  } catch (error) {
    log.error(error);

    return response.status(500).json({ error: "Erro inesperado." });
  }
};
