const mongoose = require("mongoose");
const { cnpjValidator } = require("../../utils");

const productSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: [true, "O campo Código não foi informado."],
    unique: true,
    maxLength: [50, "O campo Código deve ter no máximo 50 caracteres."],
    match: [
      /^[a-zA-Z0-9.\-]*$/,
      "O campo Código aceita apenas caracteres alfanuméricos, '.', e '-'.",
    ],
  },
  nome: {
    type: String,
    required: [true, "O campo Nome não foi informado."],
    maxLength: [300, "O campo Nome deve ter no máximo 300 caracteres."],
    match: [
      /^[a-zA-Zà-úÀ-Ú0-9 ]*$/,
      "O campo Nome aceita apenas caracteres alfanuméricos e espaços.",
    ],
  },
  cnpj: {
    type: String,
    required: [true, "O campo CNPJ não foi informado."],
    match: [/^\d{14}$/, "O valor informado para o CNPJ deve ter 14 digitos."],
    validate: {
      validator: cnpjValidator,
      message: "O valor informado para o CNPJ é inválido.",
    },
  },
  provider: {
    type: mongoose.ObjectId,
    required: [true, "O campo Provider não foi informado."],
  },
  ativo: {
    type: Boolean,
    default: true,
  },
  ultimaAlteracao: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
