import connection from './connection.js'

export async function insertRecords() {
    try {
      // Insert records into 'users' table
      await connection.query('INSERT INTO users (username, email) VALUES (?, ?)', ['user1', 'user1@example.com']);
     await  connection.query('INSERT INTO users (username, email) VALUES (?, ?)', ['user2', 'user2@example.com']);
  
      // Insert records into 'users_address' table
      await connection.query('INSERT INTO users_address (user_id, street, city) VALUES (?, ?, ?)', [1, 'Street 1', 'City A']);
     await  connection.query('INSERT INTO users_address (user_id, street, city) VALUES (?, ?, ?)', [2, 'Street 2', 'City B']);
  
      console.log('Records inserted successfully.');
    } catch (error) {
      console.error('Error inserting records:', error);
    } 
  }
  
//   insertRecords();