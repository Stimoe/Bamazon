DROP DATABASE IF EXISTS bAmazon_DB;

CREATE DATABASE bAmazon_DB;

USE bAmazon_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);


INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("High Performance MySQL", "Books", 40, 10);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("Fear Inoculum album", "Music", 20, 50);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("Bee Keeper Suit", "Clothing", 120, 5);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("15inch Acer Labtop", "Electronics", 650, 10);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("Words of Radiance", "Books", 25, 30);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("Forks", "Kitchen", 2, 50);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("Plates", "Kitchen", 10, 50);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("IPad", "Electronics", 400, 15);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("Programming Hoodie", "Clothing", 40, 15);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("Lover by Taylor Swift", "Music", 20, 100);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("Bananas", "Food", 1, 40);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("IceCream", "Food", 5, 20);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("Iphone", "Electronics", 600, 8);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("Hounded", "Books", 10, 10);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("La Croix", "Food", 3, 15);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("Shoes", "Clothing", 45, 10);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("Tortilla Chips", "Food", 3, 30);
