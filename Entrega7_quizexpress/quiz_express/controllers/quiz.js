const { models } = require("../models");

exports.index = async (req, res, next) => {
  try {
    const quizzes = await models.Quiz.findAll();
    res.render("quizzes/index", { quizzes });
  } catch (error) {
    next(error);
  }
};
