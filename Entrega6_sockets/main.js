const user = require("./cmds_user.js");
const quiz = require("./cmds_quiz.js");
const favs = require("./cmds_favs.js");
const readline = require("readline");
const net = require("net");

let clients = [];
let port = 8080;

let server = net.createServer(socket => {
  // add new client to clients array
  clients.push(socket);

  // remove client from clients array
  socket
    .on("end", () => {
      let i = clients.indexOf(socket);
      clients.splice(i, 1);
    })
    .on("error", () => {
      console.log("ERROR");
      socket.destroy();
      process.exit(0);
    });

  const rl = readline.createInterface({
    input: socket,
    output: socket,
    prompt: "> "
  });
  rl.questionP = function(string) {
    // Add questionP to rl interface
    return new Promise(resolve => {
      this.question(`  ${string}: `, answer => resolve(answer.trim()));
    });
  };

  rl.prompt();

  rl.on("line", async line => {
    try {
      let cmd = line.trim();

      if ("" === cmd) {
      } else if ("h" === cmd) {
        user.help(socket, rl);
      } else if (["lu", "ul", "u"].includes(cmd)) {
        await user.list(socket, rl);
      } else if (["cu", "uc"].includes(cmd)) {
        await user.create(socket, rl);
      } else if (["ru", "ur", "r"].includes(cmd)) {
        await user.read(socket, rl);
      } else if (["uu"].includes(cmd)) {
        await user.update(socket, rl);
      } else if (["du", "ud"].includes(cmd)) {
        await user.delete(socket, rl);
      } else if (["lq", "ql", "q"].includes(cmd)) {
        await quiz.list(socket, rl);
      } else if (["cq", "qc"].includes(cmd)) {
        await quiz.create(socket, rl);
      } else if (["tq", "qt", "t"].includes(cmd)) {
        await quiz.test(socket, rl);
      } else if (["uq", "qu"].includes(cmd)) {
        await quiz.update(socket, rl);
      } else if (["dq", "qd"].includes(cmd)) {
        await quiz.delete(socket, rl);
      } else if (["lf", "fl", "f"].includes(cmd)) {
        await favs.list(socket, rl);
      } else if (["cf", "fc"].includes(cmd)) {
        await favs.create(socket, rl);
      } else if (["df", "fd"].includes(cmd)) {
        await favs.delete(socket, rl);
      } else if ("e" === cmd) {
        socket.write("Bye!");
        let i = clients.indexOf(socket);
        clients.splice(i, 1);
      } else {
        socket.write("UNSUPPORTED COMMAND!");
        user.help(socket, rl);
      }
    } catch (err) {
      socket.write(`  ${err}`);
    } finally {
      rl.prompt();
    }
  });
});

server.listen(port);

/* const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> "
});
rl.log = msg => console.log(msg); // Add log to rl interface
rl.questionP = function(string) {
  // Add questionP to rl interface
  return new Promise(resolve => {
    this.question(`  ${string}: `, answer => resolve(answer.trim()));
  });
};

rl.prompt();

rl.on("line", async line => {
  try {
    let cmd = line.trim();

    if ("" === cmd) {
    } else if ("h" === cmd) {
      user.help(rl);
    } else if (["lu", "ul", "u"].includes(cmd)) {
      await user.list(rl);
    } else if (["cu", "uc"].includes(cmd)) {
      await user.create(rl);
    } else if (["ru", "ur", "r"].includes(cmd)) {
      await user.read(rl);
    } else if (["uu"].includes(cmd)) {
      await user.update(rl);
    } else if (["du", "ud"].includes(cmd)) {
      await user.delete(rl);
    } else if (["lq", "ql", "q"].includes(cmd)) {
      await quiz.list(rl);
    } else if (["cq", "qc"].includes(cmd)) {
      await quiz.create(rl);
    } else if (["tq", "qt", "t"].includes(cmd)) {
      await quiz.test(rl);
    } else if (["uq", "qu"].includes(cmd)) {
      await quiz.update(rl);
    } else if (["dq", "qd"].includes(cmd)) {
      await quiz.delete(rl);
    } else if (["lf", "fl", "f"].includes(cmd)) {
      await favs.list(rl);
    } else if (["cf", "fc"].includes(cmd)) {
      await favs.create(rl);
    } else if (["df", "fd"].includes(cmd)) {
      await favs.delete(rl);
    } else if ("e" === cmd) {
      rl.log("Bye!");
      process.exit(0);
    } else {
      rl.log("UNSUPPORTED COMMAND!");
      user.help(rl);
    }
  } catch (err) {
    rl.log(`  ${err}`);
  } finally {
    rl.prompt();
  }
});
 */
