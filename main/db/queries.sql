-- VIEW ALL DEPARTMENTS QUERY
SELECT * 
FROM departments;

-- VIEW ALL ROLES QUERY
-- SELECT *
-- FROM table1
-- JOIN table2 ON table1.primarykey = table2.foreignkey

SELECT role_id AS id, role_title, department_name, salary 
FROM departments 
JOIN roles ON roles.department_id = departments.department_id;

-- VIEW ALL EMPLOYEES
-- SELECT *
-- FROM table1
-- JOIN table2 ON table1.primarykey = table2.foreignkey
-- JOIN table3 ON table2.primarykey = table3.foreignkey

SELECT * 
FROM departments
JOIN roles ON departments.department_id = roles.department_id
JOIN employees ON roles.role_id = employees.role_id;

-- Add A Department
INSERT INTO departments (department_name)
    VALUES 
        (?);

-- Add A Role
INSERT INTO roles (role_title, salary, department_name)
    VALUES 
        (?,?);

-- Add A Employee
INSERT INTO roles (first_name, last_name, role_title, manager_id)
    VALUES 
        (?,?,?,?);

-- Update An Employee Role

UPDATE employees
SET role_id = ?
WHERE employee_id = ?