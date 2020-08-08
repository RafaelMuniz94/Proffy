const express = require("express");
const server = express();
const path = require("path");
const nunjucks = require("nunjucks");
const proffys = require("./model/proffys");
const subjects = require("./model/subjects");
const week = require("./model/week");

function getSubject(subjectNumber) {
  return subjects[subjectNumber - 1];
}

function pageLanmding(req, resp) {
  return resp.render("index.html");
}

function pageStudy(req, resp) {
  let filter = req.query;
  return resp.render("study.html", {
    proffys,
    filter,
    subjects,
    week,
    tittle: "Hi From Nunjucks",
  });
}

function pageGiveClasses(req, resp) {
  let data = req.query;

  if (Object.keys(data).length > 0) {
    data.subject = getSubject(data.subject);
    proffys.push(data);
    return resp.redirect("/study");
  }

  return resp.render("give-classes.html", { subjects, week });
}

// configurar nunjucks (Template engine)
nunjucks.configure(path.join(__dirname, "../../client/HTML"), {
  express: server,
  noCache: true,
});

server
  // Configurar arquivos estaticos (css, scripts, imagens)
  .use(express.static(path.join(__dirname, "../../client")))
  //rotas da aplicacao
  .get("/", pageLanmding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)
  .listen(5500); // start
