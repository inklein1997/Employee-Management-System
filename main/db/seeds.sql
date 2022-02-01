USE company_db

INSERT INTO departments (department_name)
VALUES 
    ('Operations'),
    ('Human Resources'),
    ('Quality Assurance'),
    ('Engineering'),
    ('Facilities');

INSERT INTO roles (role_title, salary, department_id)
VALUES
    ('Lab Technician', 40000, 1),
    ('Lab Supervisor', 75000, 1),
    ('HR Representative', 55000, 2),
    ('Reagents Tester', 40000, 3),
    ('Equipment Analyst', 45000, 3),
    ('Junior-level Software Engineer', 65000, 4),
    ('Mid-level Software Engineer', 85000, 4),
    ('Senior-level Software Engineer', 110000, 4),
    ('Janitor', 34000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Zachary', 'Arsement', 6, null),
    ('Martha', 'Dempsey', 9, null),
    ('Leland', 'Byrd', 6, null),
    ('Morgan', 'Henning', 8, null),
    ('Michael', 'Klein', 1, 1),
    ('Francis', 'Bond', 6, 3),
    ('Ellie', 'Delgato', 2, 4),
    ('George', 'Geils', 3, 4);

