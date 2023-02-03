INSERT INTO department (deptName)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Account Manager", 16000, 3),
       ("Accountant", 125000, 3),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 19000, 4);

-- something's off here. employee table did not populate in workbench
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1),
       ("Ashley", "Rodriguez", 3),
       ("Kunal", "Singh", 5),
       ("Sarah", "Lourd", 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
       ("Mike", "Chan", 2, 1),
       ("Kevin", "Tupik", 4, 3),
       ("Malia", "Brown", 6, 5),
       ("Tom", "Allen", 8, 7);