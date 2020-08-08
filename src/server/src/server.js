const express = require("express");
const server = express();
const path = require("path");
const nunjucks = require("nunjucks");
const proffys = require("./model/proffys")


function pageLanmding(req, resp) {
    return resp.sendFile(path.join(__dirname, "../../client/HTML/index.html"));
  }

  function pageStudy (req, resp) {
    return resp.sendFile(path.join(__dirname, "../../client/HTML/study.html"));
  }

  function pageGiveClasses(req, resp)  {
    //return resp.send(__dirname+"../../client/HTML/study.html")
    return resp.sendFile(
      path.join(__dirname, "../../client/HTML/give-classes.html")
    );
  }

  // configurar nunjucks (Template engine)
  nunjucks.configure(path.join(__dirname, "../../client/HTML",{

  }))

server
// Configurar arquivos estaticos (css, scripts, imagens)
  .use(express.static(path.join(__dirname, "../../client")))
  //rotas da aplicacao
  .get("/", pageLanmding)
  .get("/study",pageStudy)
  .get("/give-classes", pageGiveClasses)
  .listen(5500);
