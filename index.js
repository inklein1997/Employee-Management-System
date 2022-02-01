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
    const sqlQuery = `SELECT employee_id AS id, first_name, last_name, role_title, department_name, salary
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

const addDepartment = (departmentName) =>{
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

const addRole = () => {
};

const addEmployee = () => {
};

const updateEmployee = () => {
};

const askQuestions = () => {
    inquirer.prompt(questions)
        .then((answers) => {
            console.log(`\nUser selected to ${answers.userChoice}\n`)
            switch (answers.userChoice) {
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
                    addDepartment(answers.departmentName);
                    break;
                // case 'Add A Role':
                //     addRole();
                //     break;
                // case 'Add An Employee':
                //     addEmployee();
                //     break;
                // case 'Update An Employee':
                //     updateEmployee();
                //     break;
            }
        })
    return
}

askQuestions()


