const Provider = require("./Provider");
const log = require("npmlog");

module.exports = async (request, response) => {
  try {
    const { cnpj, nome } = request.body;
    const provider = new Provider({ cnpj, nome });

    await provider.save();

    return response
      .status(201)
      .json({ message: "Cadastro do fornecedor realizado com sucesso." });
  } catch (error) {
    log.error(error);

    if (error.code && error.code === 11000)
      return response
        .status(400)
        .json({ error: "O CNPJ informado já foi cadastrado." });

    if (error.errors && error.errors.cnpj)
      return response.status(400).json({ error: error.errors.cnpj.message });

    if (error.errors && error.errors.nome)
      return response.status(400).json({ error: error.errors.nome.message });

    return response.status(500).json({ error: "Erro inesperado." });
  }
};
