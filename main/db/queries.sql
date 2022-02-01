-- VIEW ALL DEPARTMENTS QUERY
SELECT * 
FROM departments;

-- VIEW ALL ROLES QUERY
-- SELECT *
-- FROM table1
-- JOIN table2 ON table1.primarykey = table2.foreignkey

SELECT *
FROM departments
JOIN roles ON departments.department_id = roles.department_id;

-- VIEW ALL EMPLOYEES
-- SELECT *
-- FROM table1
-- JOIN table2 ON table1.primarykey = table2.foreignkey
-- JOIN table3 ON table2.primarykey = table3.foreignkey

SELECT * 
FROM departments
JOIN roles ON departments.department_id = roles.department_id
JOIN employees ON roles.role_id = employees.role_id;