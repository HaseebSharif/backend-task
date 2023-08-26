import connection from './connection.js'


export async function createTables() {
  try {
    const usersTable = `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) NOT NULL
    )`;

    const usersAddressTable = `CREATE TABLE IF NOT EXISTS users_address (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      street VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`;
      connection.query(usersTable);
       connection.query(usersAddressTable);

    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    connection.end();
  }
}

