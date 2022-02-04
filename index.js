const questions = require('./main/lib/questions');
const inquirer = require("inquirer");
const cTable = require('console.table');
const db = require('./main/config/connection');

const displayDepartments = () => {
    const sqlQuery = `SELECT * FROM departments;`
    db.query(sqlQuery, (err, response) => {
        if (err) {
            console.log(err);
            return
        } else {
            console.table(response)
            askQuestions()
        }
    })
};

const displayRoles = () => {
    const sqlQuery = `SELECT role_id AS id, role_title, department_name, salary 
    FROM departments 
    JOIN roles ON roles.department_id = departments.department_id;`
    db.query(sqlQuery, (err, response) => {
        if (err) {
            console.log(err);
            return
        } else {
            console.table(response)
            askQuestions()
        }
    })
};

// NEED TO FIX MANAGERS COLUMN!
const displayEmployees = () => {
    const sqlQuery = `SELECT employee_id AS id, first_name, last_name, role_title, department_name, salary, manager_id
    FROM departments
    JOIN roles ON departments.department_id = roles.department_id
    JOIN employees ON roles.role_id = employees.role_id;`
    db.query(sqlQuery, (err, response) => {
        if (err) {
            console.log(err);
            return
        } else {
            console.table(response)
            askQuestions()
        }
    })
};

const addDepartment = (departmentName) => {
    const sqlQuery = `INSERT INTO departments (department_name) VALUES (?);`
    db.query(sqlQuery, [departmentName], (err, response) => {
        if (err) {
            console.log(err);
            return
        } else {
            console.log(`Added ${departmentName} to the database`)
            askQuestions()
        }
    })
};

const addRole = (roleTitle, salary, departmentName) => {
    const sqlQuery = `INSERT INTO roles (role_title, salary, department_id) VALUES (?,?,?);`
    db.query(sqlQuery, [roleTitle, salary, departmentName], (err, response) => {
        if (err) {
            console.log(err);
            return
        } else {
            console.log(`Added ${roleTitle} to the database`)
            askQuestions()
        }
    })
};

const addEmployee = (firstName, lastName, roleName, employeeManager) => {
    const sqlQuery = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`
    db.query(sqlQuery, [firstName, lastName, roleName, employeeManager], (err, response) => {
        if (err) {
            console.log(err);
            return
        } else {
            console.log(`Added employee ${firstName} ${lastName} to the database`)
            askQuestions()
        }
    })
};

const updateEmployee = (roleId, employeeId) => {
    const sqlQuery = `UPDATE employees SET role_id = ? WHERE employee_id = ?`
    db.query(sqlQuery, [roleId, employeeId], (err, response) => {
        if (err) {
            console.log(err);
            return
        } else {
            console.log(`Added employee ${firstName} ${lastName} to the database`)
            askQuestions()
        }
    })
};

const askQuestions = () => {
    inquirer.prompt(questions)
        .then((answers) => {
            const { userChoice, departmentName, roleName, salary, roleDepartment, firstName, lastName, employeeRole, employeeManager, employeeSelection, employeeSelectionRole } = answers
            console.log(`\nUser selected to ${userChoice}\n`)
            switch (userChoice) {
                case 'View All Departments':
                    displayDepartments();
                    break;
                case 'View All Roles':
                    displayRoles();
                    break;
                case 'View All Employees':
                    displayEmployees();
                    break;
                case 'Add A Department':
                    addDepartment(departmentName);
                    break;
                case 'Add A Role':
                    addRole(roleName, salary, roleDepartment);
                    break;
                case 'Add An Employee':
                    addEmployee(firstName, lastName, employeeRole, employeeManager);
                    break;
                case 'Update An Employee':
                    updateEmployee(employeeSelectionRole, employeeSelection);
                    break;
            }
        })
    return
}

askQuestions()