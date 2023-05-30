"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: "string no formato ano-mês-dia"
    },
    {
        id: "002",
        name: "Beltrana",
        email: "beltrana@email.com",
        password: "beltrana00",
        createdAt: "string no formato ano-mês-dia"
    }
];
exports.products = [
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas.",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
];
function createUser(id, name, email, password) {
    const newUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    exports.users.push(newUser);
    return "Cadastro realizado com sucesso!";
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=database.js.map