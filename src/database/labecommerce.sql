-- Active: 1687656101633@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT(DATETIME())
);

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

--Get All Users
SELECT * FROM users;

--Get All Products (funcionalidade 1 - produtos cadastrados)
SELECT * FROM products;

--Get all Products (funcionalidade 2 - com termo de busca)
SELECT * FROM products WHERE name LIKE "no%";

--create user
INSERT INTO users (id, name, email, password)
VALUES 
    ('user001','Natasha Romanoff', 'black-avenger@hotmail.com', 'vingadoramaisf0d0n4'),
    ('user002', 'Steve Rogers', 'america-cap@gmail.com', 'ilovepeggycarter'),
    ('user003', 'Thor', 'for-asgard@gmail.com', 'playboyzinho'),
    ('user004', 'Bruce Banner', 'green-banner@gmail.com', 'vingadormaisforte');

SELECT * FROM products;
--create product
INSERT INTO products (id, name, price, description, image_url)
VALUES 
    ('prod001', 'Smart Phone', 3000, 'Smartphone de última geração', 'https://picsum.photos/200/300' ),
    ('prod002', 'Smart TV Roku', 4000, 'Diversos aplicativos gratuitos', 'https://picsum.photos/200/300' ),
    ('prod003', 'Computador', 9000, 'Perfeito para gamers', 'https://picsum.photos/200/300' ),
    ('prod004', 'Cadeira Gamer', 3000, 'O melhor em conforto durante seus jogos!', 'https://picsum.photos/200/300' ),
    ('prod005', 'Kit Gamer Headphones + Mouse + 1 Game', 2000, 'O trio que você precisava!', 'https://picsum.photos/200/300' );

--delete user by id
DELETE FROM users WHERE id = 'user004';

--delete product by id
DELETE FROM products WHERE id = 'prod004';

--edit product by ID
UPDATE products
SET
id = 'prod004',
name = 'Mouse Óptico',
price = 100,
description = 'Melhor mouse óptico do mercado!',
image_url = 'https://picsum.photos/200/300'
WHERE id = 'prod003';

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT(DATETIME()),
    FOREIGN KEY(buyer) REFERENCES users(id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

INSERT INTO purchases(id, buyer, total_price)
VALUES 
    ('pur001', 'user003', 3000),
    ('pur002', 'user001', 9000);


UPDATE purchases
SET
    total_price = 900
WHERE id = 'pur002';

SELECT 
    purchases.id AS purchaseId,
    users.id AS buyerId, 
    users.name AS buyerName,
    email,
    total_price AS totalPrice,
    purchases.created_at AS boughtAt
    
FROM users
INNER JOIN purchases;

CREATE TABLE  purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(purchase_id) REFERENCES purchases(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
        ON UPDATE CASCADE
		ON DELETE CASCADE
);

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
    ('pur001', 'prod004', 2),
    ('pur001', 'prod001', 1),
    ('pur002', 'prod002', 1);

--Introdução ao Knex





