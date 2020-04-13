const { User, Quiz } = require("./model.js").models;

// Show all favourites in DB including <user> and <id>
exports.list = async (socket, rl) => {
  let users = await User.findAll({
    include: [{ model: Quiz, as: "fav" }]
  });
  users.forEach(u => {
    if (u.fav.length !== 0) {
      u.fav.forEach(q =>
        socket.write(`  Quiz ${q.id} (${q.question}) favourite of ${u.name}`)
      );
    }
  });
};

// Create favourite in the DB
exports.create = async (socket, rl) => {
  let name = await rl.questionP("Enter name");
  let id = await rl.questionP("Enter quiz id");
  if (!name || !id) throw new Error("Response can't be empty!");

  let user = await User.findOne({ where: { name } });
  if (!user) throw new Error(`  ${name} not in DB`);

  let quiz = await Quiz.findByPk(Number(id));
  if (!quiz) throw new Error(`  Quiz not in DB`);

  await user.addFav(quiz);

  socket.write(
    `  '${quiz.question} -> ${quiz.answer} (${id})' favourite of ${name}`
  );
};

// Delete favourite in the DB
exports.delete = async (socket, rl) => {
  let name = await rl.questionP("Enter name");
  let id = await rl.questionP("Enter quiz id");
  if (!name || !id) throw new Error("Response can't be empty!");

  let user = await User.findOne({ where: { name } });
  if (!user) throw new Error(`  ${name} not in DB`);

  let quiz = await Quiz.findByPk(Number(id));
  if (!quiz) throw new Error(`  Quiz not in DB`);

  await user.removeFav(quiz);

  socket.write(`  Favourite (${id}, ${name}) deleted`);
};
