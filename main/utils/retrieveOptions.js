const inquirer = require('inquirer');
const db = require('../config/connection')

const retrieveDepartments = async (data) => {
    let depts = await db.promise().query(`SELECT * FROM departments`);
    let deptsArr = depts[0].map(({ department_id, department_name }) => ({
        name: `${department_name}`,
        value: department_id
    }));
    return deptsArr
}

const retrieveRoles = async () => {
    let roles = await db.promise().query(`SELECT * FROM roles`);
    let rolesArr = roles[0].map(({ role_id, role_title }) => ({
        name: `${role_title}`,
        value: role_id
    }));
    return rolesArr
}

const retrieveEmployees = async () => {
    let employees = await db.promise().query(`SELECT * FROM employees`);
    // console.log(employees[0])
    let employeesArr = employees[0].map(({ employee_id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: employee_id
    }));
    return employeesArr
}


module.exports = { retrieveDepartments, retrieveRoles, retrieveEmployees };