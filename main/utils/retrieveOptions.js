const db = require('../config/connection')

// const retrieveDepartments = () => {
//     let departmentList
//     db.query(`SELECT department_name FROM departments;`, (err, response) => {
//         if (err) {
//             console.log(err);
//         } else {
//             const departments = response.map(department => department.department_name);
//             departmentList = departments
//             // return departments;
//         }
//     })
//     return departmentList
// }

// console.log(retrieveDepartments());



const retrieveDepartments = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT department_name FROM departments;`, (err, response) => {
            if (err) {
                reject(err);
            } else {
                resolve(response.map(department => department.department_name))
            }
        })
    })
}

const departmentList = retrieveDepartments().then(data => console.log(data)).catch('there is an error')

module.exports = departmentList

// console.log(retrieveDepartments().then(data => {return data}))