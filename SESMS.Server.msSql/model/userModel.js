const pool = require("../database");

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(255),
    password VARCHAR(255),
    firstName VARCHAR(255),
    middleName VARCHAR(255),
    lastName VARCHAR(255),
    suffixName VARCHAR(20),
    phoneNumber VARCHAR(20),
    email VARCHAR(255),
    userRole VARCHAR(255),
    isActive BOOLEAN DEFAULT true,
    contents TEXT

    CHECK (email REGEXP '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,4}$')
  );
`;

pool
  .query(createTableQuery)
  .then((result) => {
    console.log("User Table created successfully");
  })
  .catch((error) => {
    console.error("Error creating table:", error);
  });

async function index() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

async function store() {}

async function show() {}

async function update() {}

async function destroy() {}

module.exports = {
  index,
  show,
  update,
  destroy,
};
