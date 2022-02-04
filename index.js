const questions = require('./main/lib/questions');
const inquirer = require("inquirer");
const cTable = require('console.table');
const db = require('./main/config/connection');

const displayDepartments = () => {
    const sqlQuery = `SELECT * FROM departments;`;
    db.query(sqlQuery, (err, response) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.table(response);
            askQuestions();
        }
    })
};

const displayRoles = () => {
    const sqlQuery = `SELECT role_id AS id, role_title, department_name, salary 
        FROM departments 
        JOIN roles ON roles.department_id = departments.department_id;`;
    db.query(sqlQuery, (err, response) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.table(response);
            askQuestions();
        }
    })
};

const displayEmployees = () => {
    const sqlQuery = `SELECT emp.employee_id AS id, emp.first_name, emp.last_name, role_title, department_name, emp.manager_id, man.first_name AS manager_first_name, man.
        last_name AS manager_last_name
        FROM employees emp
        LEFT JOIN roles ON emp.role_id = roles.role_id
        LEFT JOIN departments ON roles.department_id= departments.department_id
        LEFT JOIN employees man
        ON man.employee_id = emp.manager_id;`;
    db.query(sqlQuery, (err, response) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.table(response);
            askQuestions();
        }
    })
};

const addDepartment = (departmentName) => {
    const sqlQuery = `INSERT INTO departments (department_name) VALUES (?);`
    db.query(sqlQuery, [departmentName], (err, response) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log(`Added ${departmentName} to the database`);
            askQuestions();
        }
    })
};

const addRole = (roleTitle, salary, departmentName) => {
    const sqlQuery = `INSERT INTO roles (role_title, salary, department_id) VALUES (?,?,?);`;
    db.query(sqlQuery, [roleTitle, salary, departmentName], (err, response) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log(`Added ${roleTitle} to the database`);
            askQuestions();
        }
    })
};

const addEmployee = (firstName, lastName, roleName, employeeManager) => {
    const sqlQuery = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
    db.query(sqlQuery, [firstName, lastName, roleName, employeeManager], (err, response) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log(`Added employee ${firstName} ${lastName} to the database`);
            askQuestions();
        }
    })
};

const updateEmployee = (roleId, employeeId) => {
    const sqlQuery = `UPDATE employees SET role_id = ? WHERE employee_id = ?`;
    db.query(sqlQuery, [roleId, employeeId], (err, response) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("The Employee's role has been changed");
            askQuestions();
        }
    })
};

const viewEmployeesByDepartment = (departmentId) => {
    const sqlQuery = `SELECT employee_id, first_name, last_name, departments.department_name
        FROM company_db.employees
        JOIN company_db.roles ON employees.role_id = roles.role_id
        JOIN company_db.departments ON roles.department_id = departments.department_id
        WHERE departments.department_id = ?;`;
    db.query(sqlQuery, [departmentId], (err, response) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.table(response);
            askQuestions();
        }
    })
}

const viewEmployeesByManager = (managerId) => {
    const sqlQuery = `SELECT emp.employee_id AS id, emp.first_name, emp.last_name, emp.manager_id, man.first_name AS manager_first_name, man.last_name AS manager_last_name
        FROM employees emp
        LEFT JOIN employees man
        ON man.employee_id = emp.manager_id
        WHERE emp.manager_id = ?;`;
    db.query(sqlQuery, [managerId], (err, response) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.table(response);
            askQuestions();
        }
    })
}

const updateEmployeeManager = (employeeId, managerId) => {
    const sqlQuery = `UPDATE employees SET manager_id = ? WHERE employee_id = ?`;
    db.query(sqlQuery, [managerId, employeeId], (err, response) => {
        err ? console.log(err) : console.log(`Employee's manager has been updated`);
        askQuestions();
    })
}

const deleteDepartment = (departmentId) => {
    const sqlQuery = `DELETE FROM departments WHERE department_id = ?;`;
    db.query(sqlQuery, [departmentId], (err, res) => {
        err ? console.log(err) : console.log(`Department has been deleted`);
        askQuestions();
    })
}

const deleteRole = (roleId) => {
    const sqlQuery = `DELETE FROM roles WHERE role_id = ?;`;
    db.query(sqlQuery, [roleId], (err, res) => {
        err ? console.log(err) : console.log(`Role has been deleted`);
        askQuestions();
    })
}

const deleteEmployee = (employeeId) => {
    const sqlQuery = `DELETE FROM employees WHERE employee_id = ?;`;
    db.query(sqlQuery, [employeeId], (err, res) => {
        err ? console.log(err) : console.log(`Employee has been deleted`);
        askQuestions();
    })
}

const displayBudget = () => {
    const sqlQuery = `SELECT department_name, SUM(salary) AS Budget
    FROM employees
    JOIN roles ON employees.role_id = roles.role_id
    LEFT JOIN departments ON roles.department_id= departments.department_id
    GROUP BY departments.department_name;`;
    db.query(sqlQuery, (err, response) => {
        err ? console.log(err) : console.table(response)
        askQuestions();
    })
}

const askQuestions = () => {
    inquirer.prompt(questions)
        .then((answers) => {
            const { userChoice, departmentName, roleName, salary, roleDepartment, firstName, lastName, employeeRole, employeeManager, employeeSelection, employeeSelectionRole } = answers;
            console.log(`\nYou selected ${userChoice}\n`);
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
                case 'Update An Employee Role':
                    updateEmployee(employeeSelectionRole, employeeSelection);
                    break;
                case 'View Employees By Department':
                    viewEmployeesByDepartment(roleDepartment);
                    break;
                case 'View Employees By Manager':
                    viewEmployeesByManager(employeeManager);
                    break;
                case 'Update Employee Managers':
                    updateEmployeeManager(employeeSelection, employeeManager)
                    break;
                case 'Delete A Department':
                    deleteDepartment(roleDepartment);
                    break;
                case 'Delete A Role':
                    deleteRole(employeeRole);
                    break;
                case 'Delete An Employee':
                    deleteEmployee(employeeSelection);
                    break;
                case 'Display Budget For Each Department':
                    displayBudget();
                    break;
                case 'Quit':
                    console.log('Goodbye!');
                    db.end();
                    break;
            }
        })
}

askQuestions();