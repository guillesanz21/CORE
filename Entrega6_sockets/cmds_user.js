const { User, Quiz } = require("./model.js").models;

exports.help = (socket, rl) =>
  socket.write(
    `  Commands (params are requested after):
    > h              ## show help
    >
    > lu | ul | u    ## users: list all
    > cu | uc        ## user: create
    > ru | ur | r    ## user: read (show age)
    > uu             ## user: update
    > du | ud        ## user: delete
    >
    > lq | ql | q    ## quizzes: list all
    > cq | qc        ## quiz: create
    > tq | qt | t    ## quiz: test (play)
    > uq | qu        ## quiz: update
    > dq | qd        ## quiz: delete
    >
    > lf | fl | f    ## favourites: list all
    > cf | fc        ## favourite: create
    > df | fd        ## favourite: delete
    >
    > e              ## exit & return to shell\n`
  );

// Show all users in DB
exports.list = async (socket, rl) => {
  let users = await User.findAll();

  users.forEach(u => socket.write(`  ${u.name} is ${u.age} years old`));
};

// Create user with age in the DB
exports.create = async (socket, rl) => {
  let name = await rl.questionP("Enter name");
  if (!name) throw new Error("Response can't be empty!");

  let age = await rl.questionP("Enter age");
  if (!age) throw new Error("Response can't be empty!");

  await User.create({ name, age });
  socket.write(`   ${name} created with ${age} years`);
};

// Show user's age, quizzes & favourites
exports.read = async (socket, rl) => {
  let name = await rl.questionP("Enter name");
  if (!name) throw new Error("Response can't be empty!");

  let user = await User.findOne({
    where: { name },
    include: [
      { model: Quiz, as: "posts" },
      { model: Quiz, as: "fav", include: [{ model: User, as: "author" }] }
    ]
  });
  if (!user) throw new Error(`  '${name}' is not in DB`);

  socket.write(`  ${user.name} is ${user.age} years old`);

  socket.write(`    Quizzes:`);
  user.posts.forEach(quiz =>
    socket.write(`      ${quiz.question} -> ${quiz.answer} (${quiz.id})`)
  );

  socket.write(`    Favourite quizzes:`);
  user.fav.forEach(quiz =>
    socket.write(
      `      ${quiz.question} -> ${quiz.answer} (${quiz.author.name}, ${quiz.id})`
    )
  );
};

// Update the user (identified by name) in the DB
exports.update = async (socket, rl) => {
  let old_name = await rl.questionP("Enter name to update");
  if (!old_name) throw new Error("Response can't be empty!");

  let name = await rl.questionP("Enter new name");
  if (!name) throw new Error("Response can't be empty!");

  let age = await rl.questionP("Enter new age");
  if (!age) throw new Error("Response can't be empty!");

  let n = await User.update({ name, age }, { where: { name: old_name } });
  if (n[0] === 0) throw new Error(`  ${old_name} not in DB`);

  socket.write(`  ${old_name} updated to ${name}, ${age}`);
};

// Delete user & his quizzes/favourites (relation: onDelete: 'cascade')
exports.delete = async (socket, rl) => {
  let name = await rl.questionP("Enter name");
  if (!name) throw new Error("Response can't be empty!");

  let n = await User.destroy({ where: { name } });
  if (n === 0) throw new Error(`User ${name} not in DB`);

  socket.write(`  ${name} deleted from DB`);
};
