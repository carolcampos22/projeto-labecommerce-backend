import { log } from "console"
import { users, products, createUser, getAllUsers } from "./database"

console.log(users)
console.log(products);

console.log(createUser("03", "Sicrano", "sicrano@gmail.com", "sicsic123"))
console.table(users)
console.log("All users: ", getAllUsers())





