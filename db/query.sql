-- view all departments, 
SELECT * FROM employees_db.department;

-- view all roles, 
SELECT * FROM employees_db.roles;

-- view all employees, 
SELECT * FROM employees_db.employee;

-- add a department, 
INSERT INTO department (name) VALUES (?);

-- add a role, 
INSERT INTO role (title, salary, department_id) VALUES (???, ??, ?);

-- add an employee, 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (????, ???, ??, ?);

--  update an employee role
UPDATE employee SET role_id = ? WHERE id = ?;