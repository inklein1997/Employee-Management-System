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

const addDepartment = (departmentName) => {
    inquirer.prompt({
        type: 'input',
        message: 'What is the name of the department?',
        name: 'departmentName',
        // when: (answers => answers.userChoice == 'Add A Department'),
    }).then(answers => {
        const sqlQuery = `INSERT INTO departments (department_name) VALUES (?);`
        db.query(sqlQuery, [answers.departmentName], (err, response) => {
            if (err) {
                console.log(err);
                return
            } else {
                response.map(department => console.log(department))
                console.log(`Added ${departmentName} to the database`)
                askQuestions()
            }
        })
    })
};

const addRole = () => {
    let departmentList
    const sqlQuery1 = `SELECT * FROM departments;`
    db.query(sqlQuery1, (err, response) => {
        departmentList = response.map(department => department.department_name)
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'roleName',
                // when: (answers => answers.userChoice == 'Add A Role'),
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'salary',
                // when: (answers => answers.userChoice == 'Add A Role'),
            },
            {
                type: 'list',
                message: 'Which department does the role belong to?',
                choices: departmentList,
                name: 'roleDepartment',
                // when: (answers => answers.userChoice == 'Add A Role'),
            },
        ]).then(answers => {
            const { roleName, salary, roleDepartment } = answers
            const id = departmentList.indexOf(roleDepartment)
            const sqlQuery = `INSERT INTO roles (role_title, salary, department_id) VALUES (?,?,?);`
            db.query(sqlQuery, [roleName, salary, id], (err, response) => {
                if (err) {
                    console.log(err);
                    return
                } else {
                    console.log(`Added ${roleName} to the database`)
                    askQuestions()
                }
            })
        })
    })
};

const addEmployee = () => {
    // let departmentList
    const sqlQuery1 = `SELECT employee_id AS id, first_name, last_name, role_title, department_name, salary, manager_id
    FROM departments
    JOIN roles ON departments.department_id = roles.department_id
    LEFT JOIN employees ON roles.role_id = employees.role_id;`

    db.query(sqlQuery1, (err, response) => {
        let roles = [...new Set(response.map(employee => employee.role_title))]

        let managers = response.map(employee => ({ employeeId: employee.id, firstName: employee.first_name, lastName: employee.last_name, managerId: employee.manager_id })).filter(employee => typeof employee.employeeId == 'number' && typeof employee.managerId != 'number')

        let employeeArray = managers.map(employee => `${employee.firstName} ${employee.lastName}`)
        inquirer.prompt([
            {
                type: 'input',
                message: "What is the employee's FIRST name?",
                name: 'firstName',
                // when: (answers => answers.userChoice == 'Add An Employee'),
            },
            {
                type: 'input',
                message: "What is the employee's LAST name?",
                name: 'lastName',
                // when: (answers => answers.userChoice == 'Add An Employee'),
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                name: 'employeeRole',
                choices: roles,
                // when: (answers => answers.userChoice == 'Add An Employee'),
            },
            {
                type: 'list',
                message: "Who is the employee's manager?",
                name: 'employeeManager',
                choices: employeeArray,
                // when: (answers => answers.userChoice == 'Add An Employee'),
            },
        ]).then(answers => {
            const sqlQuery2 = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`
            const { firstName, lastName, employeeRole, employeeManager } = answers
            const roleId = roles.indexOf(employeeRole)
            const managerID = managers[managers.findIndex(manager => `${manager.firstName} ${manager.lastName}` == employeeManager)].employeeId

            db.query(sqlQuery2, [firstName, lastName, roleId, managerID], (err, response) => {
                if (err) {
                    console.log(err);
                    return
                } else {
                    console.log(`Added employee ${firstName} ${lastName} to the database`)
                    askQuestions()
                }
            })
        })
    })
}

const updateEmployee = () => {
    const sqlQuery1 = `SELECT employee_id AS id, first_name, last_name, roles.role_id, role_title, department_name, salary, manager_id
    FROM departments
    JOIN roles ON departments.department_id = roles.department_id
    LEFT JOIN employees ON roles.role_id = employees.role_id;`

    db.query(sqlQuery1, (err, response) => {
        console.log(response)
        let roles = [...new Set(response.map(employee => employee.role_title))]
        let employees = response.map(employee => ({ employeeId: employee.id, firstName: employee.first_name, lastName: employee.last_name, managerId: employee.manager_id })).filter(employee => employee.firstName != null)
        let employeesList = employees.map(employee => `${employee.firstName} ${employee.lastName}`)
        inquirer.prompt([
            {
                type: 'list',
                message: "Who's information would you like to update?",
                name: 'employeeSelection',
                choices: employeesList,
            },
            {
                type: 'list',
                message: "Which role do you ant to assign the selected employee?",
                name: 'employeeSelectionRole',
                choices: roles,
            },
        ]).then(answers => {
            let employeeId = employees[employees.findIndex(employee => `${employee.firstName} ${employee.lastName}`  == answers.employeeSelection)].employeeId
            let roleId = response[response.findIndex(employee => answers.employeeSelectionRole == employee.role_title)].role_id
            const sqlQuery = `UPDATE employees SET role_id = ? WHERE employee_id = ?`
            db.query(sqlQuery, [roleId, employeeId], (err, response) => {
                if (err) {
                    console.log(err);
                    return
                } else {
                    console.log(`Added employee ${answers.employeeSelection} to the database`)
                    askQuestions()
                }
            })
        })
    })
}

const askQuestions = () => {
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
        name: 'userChoice',
    }).then((answer) => {
        console.log(`\nUser selected to ${answer.userChoice}\n`)
        switch (answer.userChoice) {
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
                addDepartment();
                break;
            case 'Add A Role':
                addRole();
                break;
            case 'Add An Employee':
                addEmployee();
                break;
            case 'Update An Employee Role':
                updateEmployee();
                break;
        }
    })
    return
}

askQuestions()
