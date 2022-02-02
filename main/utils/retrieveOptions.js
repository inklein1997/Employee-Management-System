// const db = require('../config/connection')
// const questions = require('../lib/questions')

// const retrieveDepartments = () => { 
//     const bigarray = db.query(`SELECT department_name FROM departments;`, function (err, response) {
//         if (response === undefined) {
//             console.log(err)
//             console.log('Data is undefined');
//         } else {
//             console.log(response)
//             // return (response.map(department => department.department_name));
//             return 'test'
//         }
//     })    
//     console.log(bigarray)
}


// retrieveDepartments()

// const retrieveDepartments = new Promise(function (resolve, reject) {
//     db.query(`SELECT department_name FROM departments;`, function (err, response) {
//         if (response === undefined) {
//             reject(new Error('Data is undefined'));
//         } else {
//             return Promise.resolve(response.map(department => department.department_name));
//         }
//     })
// })



// let data

// retrieveDepartments
//     .then((values) => {
//         return values
//     })
//     .catch(Error)

//     console.log(retrieveDepartments)
// module.exports = data
