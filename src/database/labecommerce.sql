-- Active: 1687656101633@@127.0.0.1@3306

--Get All Users
SELECT * FROM users;

--Get All Products (funcionalidade 1 - produtos cadastrados)
SELECT * FROM products;

--Get all Products (funcionalidade 2 - com termo de busca)
SELECT * FROM products WHERE name LIKE "no%";

SELECT * from users;

--create user
INSERT INTO users (id, name, email, password, created_at)
VALUES ('user004','Natasha Romanoff', 'black-avenger@hotmail.com', 'vingadoramaisforte', '25/06/23');

SELECT * FROM products;
--create product
INSERT INTO products (id, name, price, description, image_url)
VALUES ('prod004', 'Smart Phone', 2000, 'Smartphone de última geração', 'https://picsum.photos/200/300' );

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
);

INSERT INTO purchases(id, buyer, total_price)
VALUES 
    ('pur001', 'user003', 3000),
    ('pur002', 'user001', 1000);


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






