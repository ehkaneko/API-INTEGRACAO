const Provider = require("./Provider");
const log = require("npmlog");

module.exports = async (request, response) => {
  try {
    const providers = await Provider.find(
      { ativo: true },
      "-_id cnpj nome"
    ).exec();

    return response.status(200).json({ fornecedores: providers });
  } catch (error) {
    log.error(error);

    return response.status(500).json({ error: "Erro inesperado." });
  }
};
