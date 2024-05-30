var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashboardController");

router.get("/buscarUltimasMedidas", function (req, res) {
    dashController.buscarUltimasMedidas(req, res);
});


router.get("/pergunta1", function (req, res) {
    dashController.pergunta1(req, res);
});

router.get("/pergunta2", function (req, res) {
    dashController.pergunta2(req, res);
});

router.get("/pergunta3", function (req, res) {
    dashController.pergunta3(req, res);
});

router.get("/pergunta4", function (req, res) {
    dashController.pergunta4(req, res);
});

module.exports = router;