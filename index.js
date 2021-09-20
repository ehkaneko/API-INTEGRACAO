require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const log = require("npmlog");
const router = require("./routes");

const app = express();

(async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    log.info("Conexão com o BD aberta");

    app.use(helmet());
    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ limit: "1mb", extended: true }));

    app.use("/", router);

    app.listen(process.env.API_PORT, () => {
      log.info(`API executando em localhost:${process.env.API_PORT}`);
    });
  } catch (error) {
    log.error(error);
  }
})();
