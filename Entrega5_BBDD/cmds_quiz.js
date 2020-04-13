const { User, Quiz, Score } = require("./model.js").models;

let __getQuizzes = async () => {
  return await Quiz.findAll({
    include: [
      {
        model: User,
        as: "author"
      }
    ]
  });
};

// Show all quizzes in DB including <id> and <author>
exports.list = async rl => {
  let quizzes = await __getQuizzes();
  quizzes.forEach(q =>
    rl.log(`  "${q.question}" (by ${q.author.name}, id=${q.id})`)
  );
};

// Create quiz with <question> and <answer> in the DB
exports.create = async rl => {
  let name = await rl.questionP("Enter user");
  let user = await User.findOne({ where: { name } });
  if (!user) throw new Error(`User ('${name}') doesn't exist!`);

  let question = await rl.questionP("Enter question");
  if (!question) throw new Error("Response can't be empty!");

  let answer = await rl.questionP("Enter answer");
  if (!answer) throw new Error("Response can't be empty!");

  await Quiz.create({ question, answer, authorId: user.id });
  rl.log(`   User ${name} creates quiz: ${question} -> ${answer}`);
};

// Test (play) quiz identified by <id>
exports.test = async rl => {
  let id = await rl.questionP("Enter quiz Id");
  let quiz = await Quiz.findByPk(Number(id));
  if (!quiz) throw new Error(`  Quiz '${id}' is not in DB`);

  let answered = await rl.questionP(quiz.question);

  if (answered.toLowerCase().trim() === quiz.answer.toLowerCase().trim()) {
    rl.log(`  The answer "${answered}" is right!`);
  } else {
    rl.log(`  The answer "${answered}" is wrong!`);
  }
};

// Play
exports.play = async rl => {
  let quizzes = await __getQuizzes();
  quizzes.sort(() => Math.random() - 0.5); // Aleatorizo el orden
  let answered;
  let score = 0;

  for await (const q of quizzes) {
    if (!q.question) throw new Error(`  Quiz '${q}' is not in DB`);
    answered = await rl.questionP(q.question);
    // ############ La pregunta es correcta ############
    if (answered.toLowerCase().trim() === q.answer.toLowerCase().trim()) {
      rl.log(`  The answer "${answered}" is right!`);
      score++;
      // ############ La pregunta es incorrecta ############
    } else {
      rl.log(`  The answer "${answered}" is wrong!`);
      break;
    }
  }
  rl.log(`  Score: ${score}`);

  // Funcionalidad guardar score:
  let name = await rl.questionP("Enter user");
  let user = await User.findOne({ where: { name } });
  if (!user) {
    let age = 0;
    await User.create({ name, age });
    rl.log(`   ${name} created with ${age} years`);
    user = await User.findOne({ where: { name } });
  }
  await Score.create({
    wins: score,
    userId: user.id
  });
  rl.log(`   User ${name} has reached: ${score} correct answers`);
};

// Update quiz (identified by <id>) in the DB
exports.update = async rl => {
  let id = await rl.questionP("Enter quizId");
  let quiz = await Quiz.findByPk(Number(id));

  let question = await rl.questionP(`Enter question (${quiz.question})`);
  if (!question) throw new Error("Response can't be empty!");

  let answer = await rl.questionP(`Enter answer (${quiz.answer})`);
  if (!answer) throw new Error("Response can't be empty!");

  quiz.question = question;
  quiz.answer = answer;
  await quiz.save({ fields: ["question", "answer"] });

  rl.log(`  Quiz ${id} updated to: ${question} -> ${answer}`);
};

// Delete quiz & favourites (with relation: onDelete: 'cascade')
exports.delete = async rl => {
  let id = await rl.questionP("Enter quiz Id");
  let n = await Quiz.destroy({ where: { id } });

  if (n === 0) throw new Error(`  ${id} not in DB`);
  rl.log(`  ${id} deleted from DB`);
};
