const questions = require('./lib/questions');

const inquirer = require("inquirer");


inquirer.prompt(questions)
    .then((answers) => {
        switch (answers.userChoice) {
            case 'View All Department':
                displayDepartments();
                break;
            case 'View All Roles':
                displayRoles();
                break;
            case 'View All Employees':
                displayEmployees();
                break;
            case 'Add A Department':
                addDepartment();
                break;
            case 'Add A Role':
                addRole();
                break;
            case 'Add An Employee':
                addEmployee();
                break;
            case 'Update An Employee':
                updateEmployee();
                break;
        }
    })





const displayDepartments = () => {
    console.log('\n user selected to VIEW ALL DEPARTMENTS');
    fetch('')
};

const displayRoles = () => {
    console.log('\n user selected to VIEW ALL ROLES');
};

const displayEmployees = () => {
    console.log('\n user selected to VIEW ALL EMPLOYEES');
};

const addDepartment = () => {
    console.log('\n user selected to ADD A DEPARTMENT');
};

const addRole = () => {
    console.log('\n user selected to ADD A ROLE');
};

const addEmployee = () => {
    console.log('\n user selected to ADD AN EMPLOYEE');
};

const updateEmployee = () => {
    console.log('\n user selected to UPDATE AN EMPLOYEE');
};