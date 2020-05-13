var express = require("express");
var router = express.Router();

const quizController = require("../controllers/quiz");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET /credits page. */
router.get("/credits", function (req, res, next) {
  res.render("credits");
});

/* GET /quizzes page. */
router.get("/quizzes", quizController.index);

module.exports = router;
