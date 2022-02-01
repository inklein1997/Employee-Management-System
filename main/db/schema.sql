DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
    department_id INT NOT NULL,
    department_name VARCHAR(25) NOT NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE roles (
    role_id INT NOT NULL,
    role_title VARCHAR(25) NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL, --FK
    PRIMARY KEY (role_id)
    FOREIGN KEY (department_id)
    REFERENCES (departments.department_id)
    ON DELETE SET NULL
);

CREATE TABLE employees (1
    employee_id INT NOT NULL, --PK1
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(15) NOT NULL,
    role_id INT NOT NULL, --FK
    manager_id INT NOT NULL, --FK1
    PRIMARY KEY (employee_id)
    FOREIGN KEY (role_id)
    REFERENCES (roles.roles_id)
    ON DELETE SET NULL
);