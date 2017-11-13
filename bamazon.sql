DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(25) NOT NULL,
	department_name VARCHAR(25) NOT NULL,
	price INTEGER(10),
	stock_quantity INTEGER(10),
	PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Book", "Books", 16, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("CD", "Movies", 12, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Charger", "Computers", 19, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chair", "Home", 110, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Water", "Food", 5, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", "Beauty", 6, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Doll", "Toys", 15, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tshirt", "Clothing", 29, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ball", "Sports", 8, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oil", "Automotive", 20, 5);