const mysql = require('mysql2');

let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'HBstXZYxgIJJuzX7baCSdwnEI3',
    database: 'postvetas_centra_v3'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log('Connected as id ' + connection.threadId);
  });

  connection.on('error', (err) => {
    console.error('DB error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Reconnect if connection is lost
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = (on, config) => {
  on('task', {
    queryDatabase(query) {
      return new Promise((resolve, reject) => {
        if (!connection || connection.state === 'disconnected') {
          handleDisconnect();
        }
        connection.query(query, (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      });
    }
  });
};
