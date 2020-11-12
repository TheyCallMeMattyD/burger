// Set up Node to mySQL connection
const mysql = require('mysql');

const connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    database: 'burgers_db',
    user: 'root',
    password: 'password',
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

connection.end();

// Export connection for ORM to use
module.exports = connection;