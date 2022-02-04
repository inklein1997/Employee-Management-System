const { retrieveDepartments, retrieveRoles, retrieveEmployees, retrieveManagers} = require('../utils/retrieveOptions.js')

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'View Employees By Department', 'View Employees By Manager', 'Update Employee Managers', 'Delete A Department', 'Delete A Role', 'Delete An Employee', 'Display Budget For Each Department', 'Quit'],
        name: 'userChoice',
    },
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'roleName',
        when: (answers => answers.userChoice == 'Add A Role'),
    },
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'salary',
        when: (answers => answers.userChoice == 'Add A Role'),
    },
    {
        type: 'list',
        message: 'Which department does the role belong to?',
        choices: async function depts() {return retrieveDepartments()},
        name: 'roleDepartment',
        when: (answers => answers.userChoice == 'Add A Role'),
    },
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'departmentName',
        when: (answers => answers.userChoice == 'Add A Department'),
    },
    {
        type: 'input',
        message: "What is the employee's FIRST name?",
        name: 'firstName',
        when: (answers => answers.userChoice == 'Add An Employee'),
    },
    {
        type: 'input',
        message: "What is the employee's LAST name?",
        name: 'lastName',
        when: (answers => answers.userChoice == 'Add An Employee'),
    },
    {
        type: 'list',
        message: "What is the employee's role?",
        name: 'employeeRole',
        choices: async function roles() {return retrieveRoles()},
        when: (answers => answers.userChoice == 'Add An Employee'),
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'employeeManager',
        choices: async function roles() {return retrieveManagers()},
        when: (answers => answers.userChoice == 'Add An Employee'),
    },
    {
        type: 'list',
        message: "Who's role would you like to update?",
        name: 'employeeSelection',
        choices: async function employees() {return retrieveEmployees()},
        when: (answers => answers.userChoice == 'Update An Employee Role'),
    },
    {
        type: 'list',
        message: "Which role do you ant to assign the selected employee?",
        name: 'employeeSelectionRole',
        choices: async function roles() {return retrieveRoles()},
        when: (answers => answers.userChoice == 'Update An Employee Role'),
    },
    {
        type: 'list',
        message: 'View employees by which department? ',
        choices: async function depts() {return retrieveDepartments()},
        name: 'roleDepartment',
        when: (answers => answers.userChoice == 'View Employees By Department'),
    },
    {
        type: 'list',
        message: "View employees by which manager?",
        name: 'employeeManager',
        choices: async function managers() {return retrieveManagers()},
        when: (answers => answers.userChoice == 'View Employees By Manager')
    },
    {
        type: 'list',
        message: "Which employee would you like to update?",
        name: 'employeeSelection',
        choices: async function employees() {return retrieveEmployees()},
        when: (answers => answers.userChoice == 'Update Employee Managers')
    },
    {
        type: 'list',
        message: "Who is that employee's new manager?",
        name: 'employeeManager',
        choices: async function managers() {return retrieveManagers()},
        when: (answers => answers.userChoice == 'Update Employee Managers')
    },
    {
        type: 'list',
        message: "Which department would you like to delete?",
        name: 'roleDepartment',
        choices: async function employees() {return retrieveDepartments()},
        when: (answers => answers.userChoice == 'Delete A Department'),
    },
    {
        type: 'list',
        message: "Which role would you like to delete?",
        name: 'employeeRole',
        choices: async function employees() {return retrieveRoles()},
        when: (answers => answers.userChoice == 'Delete A Role'),
    },
    {
        type: 'list',
        message: "Which employee would you like to delete?",
        name: 'employeeSelection',
        choices: async function employees() {return retrieveEmployees()},
        when: (answers => answers.userChoice == 'Delete An Employee'),
    },
]

module.exports = questions