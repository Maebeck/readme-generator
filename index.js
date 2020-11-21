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
            name: "title"
        },
        {
            type: "input",
            message: "Describe what your project does briefly:",
            name: "description"
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
                "GPl",
                "BSD 2"],
            name: "license"
        },
        {
            type: "input",
            message: "What is your GitHub name?",
            name: "GitHub"
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "email"
        }
    ]);
}
// Function that generates the README using the user inputs
function genREADME(response){
    return  `
# ${response.title}

# Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Test Instructions](#testinstructions)
- [License](#license)
- [GitHub URl](#GitHub)
- [Contact Email](#email)
    
## Description
![](https://img.shields.io/badge/license-${response.license}-blue)

    ${response.description}
## Installation
    ${response.installation}
 ## Usage
    ${response.usage}
## Test Installation
    ${response.testinstructions}
## GitHub URl
    For any questions about this project, you can click on my GitHub
    link below:
- [GitHub Profile](https://github.com/${response.GitHub})
## License:
        For more information regarding the licensing used, click on the link below:
-[${response.license}](https://opensource.org/licenses/${response.license})  
## Additional Contact Information
    If you have any further questions, you can contact me directly at: ${response.email}.
`;
}

// Function that initializes the program
async function init() {
    try {
        const response = await userQuestions();

        const readMe = genREADME(response);

        await writeFileAsync("README.md", readMe);
        console.log("Success!");
    }catch (err){
        console.log(err);
    }
    }



init ();