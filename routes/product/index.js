const router = require("express").Router();
const getAllMethod = require("./getAllMethod");
const getByCodigoMethod = require("./getByCodigoMethod");
const postMethod = require("./postMethod");
const putMethod = require("./putMethod");
const deleteByCodigoMethod = require("./deleteByCodigoMethod");

router.route("/").get(getAllMethod);
router.route("/:codigo").get(getByCodigoMethod);
router.route("/").post(postMethod);
router.route("/").put(putMethod);
router.route("/:codigo").delete(deleteByCodigoMethod);

module.exports = router;
