USE company_db

INSERT INTO departments (department_id, department_name)
VALUES 
    (1, 'Operations'),
    (2, 'Human Resources'),
    (3, 'Quality Assurance'),
    (4, 'Engineering'),
    (5, 'Facilities');

INSERT INTO roles (role_id, role_title, salary, department_id)
VALUES
    (1, 'Lab Technician', 40000, 1),
    (2, 'Lab Supervisor', 75000, 1),
    (3, 'HR Representative', 55000, 2),
    (4, 'Reagents Tester', 40000, 3),
    (5, 'Equipment Analyst', 45000, 3),
    (6, 'Junior-level Software Engineer', 65000, 4),
    (7, 'Mid-level Software Engineer', 85000, 4),
    (8, 'Senior-level Software Engineer', 110000, 4),
    (9, 'Janitor', 34000, 5);

INSERT INTO employees (employee_id, first_name, last_name, role_id)
VALUES
    (1, 'Michael', 'Klein', 1),
    (2, 'Zachary', 'Arsement', 6),
    (3, 'Martha', 'Dempsey', 9),
    (4, 'Francis', 'Bond', 6),
    (5, 'Leland', 'Byrd', 6),
    (6, 'Ellie', 'Delgato', 2),
    (7, 'George', 'Geils', 3),
    (8, 'Morgan', 'Henning', 8);

