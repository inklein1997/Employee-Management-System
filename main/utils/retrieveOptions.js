const db = require('../config/connection')

const retrieveDepartments = () => {
    db.query(`SELECT department_name FROM departments;`, (err, response) => {
        if (err) {
            console.log(err);
        } else {
            console.log('============')
            console.log('Below is the console log within the function')
            console.log(response.map(department => department.department_name));
            return response.map(department => department.department_name)
        }
    })
}
console.log('============')
console.log('below is the console log outside of the function')
console.log(retrieveDepartments())