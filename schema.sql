DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;
USE bamazonDB;

CREATE TABLE products (
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 4) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("television", "electronics", 500, 50), ("mattress", "furniture", 2000, 12), ("mirror", "decorations", 10.50, 75), ("microwave", "appliances", 35.99, 65), ("bookself", "furniture", 100, 5), ("stove", "appliances", 555.55, 342), ("stereo", "electronics", 900.99, 123), ("couch", "furniture", 1000, 2), ("painting", "decorations", 739.10, 1), ("table", "furniture", 150, 9000);