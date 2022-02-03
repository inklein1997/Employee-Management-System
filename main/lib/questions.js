const updateEmployeeQuestions = [
    {
        type: 'list',
        message: "Who's information would you like to update?",
        name: 'employeeSelection',
        choices: ['1', '2', '3'],
        // when: (answers => answers.userChoice == 'Update An Employee Role'),
    },
    {
        type: 'list',
        message: "Which role do you ant to assign the selected employee?",
        name: 'employeeSelectionRole',
        choices: ['1', '2', '3'],
        // when: (answers => answers.userChoice == 'Update An Employee Role'),
    },
]