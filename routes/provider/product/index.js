const router = require("express").Router();
const getByCnpjMethod = require("./getByCnpjMethod");

router.route("/:cnpj").get(getByCnpjMethod);

module.exports = router;
