const { User, Quiz, Score } = require("./model.js").models;

exports.list = async rl => {
  let scores = await Score.findAll({
    include: [
      {
        model: User,
        as: "user"
      }
    ]
  });
  let user;
  let date;
  for await (const s of scores) {
    user = await User.findByPk(s.userId);
    date = new Date(s.createdAt).toUTCString();
    rl.log(`  "${user.name}"|${s.wins}|, ${date}`);
  }
};
