var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/finalizar/:idUsuario", function (req, res) {
    usuarioController.finalizar(req, res);
});

router.get("/updateFK", function (req, res) {
    usuarioController.updateFK(req, res);
});

router.post("/pontuacao", function (req, res) {
    usuarioController.pontuacao(req, res);
});

router.post("/quiz", function (req,res) {
    usuarioController.quiz(req, res);
});

router.get("/buscarQuiz", function (req,res) {
    usuarioController.buscarQuiz(req, res);
});

module.exports = router;