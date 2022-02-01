const questions = require('./main/lib/questions');
const inquirer = require("inquirer");
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'company_db'
    },
    console.log('Connection to company_db established!')
);

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
    const sqlQuery = `SELECT * FROM departments JOIN roles ON departments.department_id = roles.department_id;`
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

const displayEmployees = () => {
};

const addDepartment = () => {
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
            console.log(`User selected to ${answers.userChoice}`)
            switch (answers.userChoice) {
                case 'View All Departments':
                    displayDepartments();
                    break;
                case 'View All Roles':
                    displayRoles();
                    break;
                // case 'View All Employees':
                //     displayEmployees();
                //     break;
                // case 'Add A Department':
                //     addDepartment();
                //     break;
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


