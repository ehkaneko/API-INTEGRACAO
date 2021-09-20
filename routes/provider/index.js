const router = require("express").Router();
const product = require("./product");
const getAllMethod = require("./getAllMethod");
const getByCnpjMethod = require("./getByCnpjMethod");
const postMethod = require("./postMethod");
const putMethod = require("./putMethod");
const deleteByCnpjMethod = require("./deleteByCnpjMethod");

router.use("/produto", product);

router.route("/").get(getAllMethod);
router.route("/:cnpj").get(getByCnpjMethod);
router.route("/").post(postMethod);
router.route("/").put(putMethod);
router.route("/:cnpj").delete(deleteByCnpjMethod);

module.exports = router;
