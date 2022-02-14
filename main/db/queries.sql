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

SELECT emp.employee_id AS id, emp.first_name, emp.last_name, role_title, department_name, emp.manager_id, man.first_name AS manager_first_name, man.
last_name AS manager_last_name
FROM employees emp
LEFT JOIN roles ON emp.role_id = roles.role_id
LEFT JOIN departments ON roles.department_id= departments.department_id
LEFT JOIN employees man
ON man.employee_id = emp.manager_id;

-- Add A Department
INSERT INTO departments (department_name)
    VALUES 
        (?);

-- Add A Role
INSERT INTO roles (role_title, salary, department_name)
    VALUES 
        (?,?);

-- Add A Employee
INSERT INTO employees (first_name, last_name, role_title, manager_id)
    VALUES 
        (?,?,?,?);

-- Update An Employee Role
UPDATE employees
SET role_id = ?
WHERE employee_id = ?

-- View Employees By Department
SELECT employee_id, first_name, last_name, departments.department_name
FROM company_db.employees
JOIN company_db.roles ON employees.role_id = roles.role_id
JOIN company_db.departments ON roles.department_id = departments.department_id
WHERE departments.department_id = ?;

-- View Employees By Manager
SELECT emp.employee_id AS id, emp.first_name, emp.last_name, emp.manager_id, man.first_name AS manager_first_name, man.last_name AS manager_last_name
FROM employees emp
LEFT JOIN employees man
ON man.employee_id = emp.manager_id
WHERE emp.manager_id = ?;

-- Update Employee Manager
UPDATE employees SET manager_id = ? WHERE employee_id = ?

-- Delete Role
DELETE FROM roles WHERE role_id = ?;

-- Delete Department
DELETE FROM departments WHERE department_id = ?;

-- Delete Employee
DELETE FROM employees WHERE employee_id = ?;

-- Display Budget
SELECT department_name, SUM(salary) AS Budget
FROM employees
JOIN roles ON employees.role_id = roles.role_id
LEFT JOIN departments ON roles.department_id= departments.department_id
GROUP BY departments.department_name;