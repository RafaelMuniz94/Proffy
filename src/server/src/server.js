const express = require("express");
const server = express();
const path = require("path");
const nunjucks = require("nunjucks");

const { pageLanding, pageStudy, pageGiveClasses,saveClasses } = require("./pages");

// configurar nunjucks (Template engine)
nunjucks.configure(path.join(__dirname, "../../client/HTML"), {
  express: server,
  noCache: true,
});

server
  // receber dados via body (por padrao é desativado)
  .use(express.urlencoded({ extended: true }))
  // Configurar arquivos estaticos (css, scripts, imagens)
  .use(express.static(path.join(__dirname, "../../client")))
  //rotas da aplicacao
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)
  .post("/save-classes", saveClasses)
  .listen(5500); // start
