const data = require('../utils/retrieveOptions')

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments','View All Roles','View All Employees','Add A Department','Add A Role','Add An Employee', 'Update An Employee Role'],
        name: 'userChoice',
    },
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'departmentName',
        when: (answers => answers.userChoice == 'Add A Department'),
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
        choices: ['1','2','3'],
        name: 'roleDepartment',
        when: (answers => answers.userChoice == 'Add A Role'),
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
        choices: ['1','2','3'],
        when: (answers => answers.userChoice == 'Add An Employee'),
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'employeeManager',
        choices: ['1','2','3'],
        when: (answers => answers.userChoice == 'Add An Employee'),
    },
    {
        type: 'list',
        message: "Who's information would you like to update?",
        name: 'employeeSelection',
        choices: ['1','2','3'],
        when: (answers => answers.userChoice == 'Update An Employee Role'),
    },
    {
        type: 'list',
        message: "Which role do you ant to assign the selected employee?",
        name: 'employeeSelectionRole',
        choices: ['1','2','3'],
        when: (answers => answers.userChoice == 'Update An Employee Role'),
    },
]

module.exports = questions