"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.log(database_1.users);
console.log(database_1.products);
console.log((0, database_1.createUser)("03", "Sicrano", "sicrano@gmail.com", "sicsic123"));
console.table(database_1.users);
console.log("All users: ", (0, database_1.getAllUsers)());
//# sourceMappingURL=index.js.map