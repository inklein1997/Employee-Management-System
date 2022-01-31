const Employee = require('./Employee')

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = github
    }
    getGithub() {
        if(typeof this.github !== 'string') {
            return 'Invalid github username'
        }
        return this.github
    }
    getRole() {
        return 'Engineer'
    }
}

module.exports = Engineer