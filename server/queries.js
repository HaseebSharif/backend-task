import connection from './connection.js'


async function selectAndCountRecords() {
    try {
      const [rows] = await connection.query(`
        SELECT u.*, COUNT(ua.id) AS address_count
        FROM users u
        LEFT JOIN users_address ua ON u.id = ua.user_id
        GROUP BY u.id
      `);
  
    } catch (error) {
      console.error('Error selecting and counting records:', error);
    } finally {
      connection.end();
    }
  }
  


  async function selectRecordsNotInTable2() {
    try {
      const [rows] = await connection.query(`
        SELECT u.*
        FROM users u
        LEFT JOIN users_address ua ON u.id = ua.user_id
        WHERE ua.id IS NULL
      `);
  
    } catch (error) {
      console.error('Error selecting records not in Table 2:', error);
    } finally {
      connection.end();
    }
  }
  
  
  async function selectDuplicateRecords() {
    try {
      const [rows] = await connection.query(`
        SELECT ua.*, COUNT(*) AS iteration_count
        FROM users_address ua
        GROUP BY ua.user_id, ua.street, ua.city
        HAVING COUNT(*) > 1
      `);
  
      console.log('Duplicate records in Table 2 with iteration count:', rows);
    } catch (error) {
      console.error('Error selecting duplicate records:', error);
    } finally {
      connection.end();
    }
  }
  
  