const { UserController } = require("./UserController");

global.store = { users: [] };
global.store.users.push({ name: "Benoit", age: 27, gender: "M" });

userController = new UserController();

const Benoit = userController.get("Benoit");

console.log(Benoit);
