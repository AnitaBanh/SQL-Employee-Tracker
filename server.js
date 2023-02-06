const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");
const fs = require("fs");
const inquirer = require("inquirer");

// const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL Username
    user: "root",
    // TODO: Add MySQL Password
    password: "!Fn&?9H4",
    database: "employees_db",
  },
  // console.log(`Connected to the employeess_db database.`);
  mainQuestions()
);

// questions for user input
function mainQuestions() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "mainQ",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((userChoice) => {
      switch (userChoice.mainQ) {
        case "view all departments":
          viewAllDepts();
          break;
        case "view all roles":
          viewAllRoles();
          break;
        case "view all employees":
          viewAllEmployees();
          break;
        case "add a department":
          addDept();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
        case "update an employee role":
          updateEmployeeRole();
          break;
      }
    });
}

function viewAllDepts() {
  // Query database -- view all departments,
  db.query("SELECT * FROM employees_db.department", function (err, results) {
    console.table(results);
    mainQuestions();
  });
}

function viewAllRoles() {
  // Query database -- view all roles,
  db.query("SELECT * FROM employees_db.roles", function (err, results) {
    console.table(results);
    mainQuestions();
  });
}

function viewAllEmployees() {
  // Query database -- view all employees,
  db.query("SELECT * FROM employees_db.employee", function (err, results) {
    console.table(results);
    mainQuestions();
  });
}

function addDept() {
  inquirer
    .prompt([
      {
        type: 'input',
          name: 'deptName',
          message: "What department would you like to add?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
      }
    ])
    .then(({deptName}) => {
      db.query(`INSERT INTO department (deptName) VALUES (?)`, deptName, (err,result) => {
        if (err) {
          console.log(err);
        }
        viewAllDepts();
      });
    })
  
}

function addRole() {
  db.promise().query("SELECT * FROM employees_db.department")
  .then( ([rows,fields]) => {
    var choices = rows.map(({id, deptName}) => {
      return {
        name: deptName,
        value: id
      }
    });
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: "What is the title of the role to add?"
        
      },
      {
        type: 'input',
        name: 'salary',
        message: "What is the salary of this role?"
      },
      {
        type: 'list',
        name: 'department_id',
        message: "What department does this role belong to?",
        choices
      }
    ])
    .then((data) => {
      db.query(`INSERT INTO role SET ?`, data, (err,result) => {
        if (err) {
          console.log(err);
        }
        viewAllRoles();
      });
    })
  })
  
}

app.use((req, res) => {
  res.status(404).end();
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
