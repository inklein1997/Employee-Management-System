DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    department_id INT NOT NULL,
    department_name VARCHAR(25) NOT NULL,
);

CREATE TABLE role (
    id INT NOT NULL,
    role_title VARCHAR(25) NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL,
);

CREATE TABLE role (
    id INT NOT NULL,
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(15) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL
)