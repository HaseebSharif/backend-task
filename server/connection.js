import mysql from 'mysql2'



const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'task', 
});

// Connect to the database
const c =  connection.connect(async(err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MYSQL');
});


export default connection;




