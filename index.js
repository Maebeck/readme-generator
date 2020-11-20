const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);


// Where the questions for the user are generated
function userQuestions () {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the name of your Project?",
            name: "Title"
        },
        {
            type: "input",
            message: "Describe what your project does briefly:",
            name: "Description"
        },
        {
            type: "input",
            message: "Are there any installation instructions required? Write NONE if none are needed:",
            name: "installation"
        },
        {
            type: "input",
            message: "In what way would you like your project to be used?",
            name: "usage"
        },
        {
            type: "input",
            message: "Are there any test instructions?",
            name: "testinstructions"
        },
        {
            type: "checkbox",
            message: "Please select a license.",
            choices: [
                "Apache",
                "MIT",
                "ISC",
                "GNU GPLv3"],
            name: "License"
        },
        {
            type: "input",
            message: "What is your GitHub name?",
            name: "GitHub"
        }
        {
            type: "input",
            message: "What is your email address?",
            name: "email"
        }
    ]);
}
function genREADME(response){
    return  `
    # ${response.title}

    # Table of Contents

    - [Description](#description)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Test Instructions](#testinstructions)
    - [License](#License)
    - [GitHub URL](#GitHub)
    - [Contact Email](#email)
    
    ## Description:
    ![License](https://img.shields.io/badge/License-${response.license}-blue.svg "License Badge")

        ${response.description}
    ## Installation
        ${response.installation}
    ## Usage
        ${response.usage}
    ## Test Installation
        ${response.testinstructions}
    ## GitHub URL
        For any questions about this project, you can click on my GitHub
        link below:
        - [GitHub Profile](https://github.com/${response.GitHub})
    ## License:
        For more information regarding the licensing used, click on the link below:
        - [License](https://opensource.org/licenses/${response.license})   
    ## Additional Contact Information
        If you have any further questions, you can contact me directly at: ${response.email}.
`;
}

async function init() {
    try {
        const response = await promptUser();

        const readMe = genREADME(response);
    }
}