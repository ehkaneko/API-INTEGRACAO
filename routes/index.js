const router = require("express").Router();
const product = require("./product");
const provider = require("./provider");

router.use("/produto", product);
router.use("/fornecedor", provider);

module.exports = router;
