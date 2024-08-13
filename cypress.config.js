const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');
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

module.exports = defineConfig({
  projectId: 'zimznw',
  e2e: {
    setupNodeEvents(on, config) {
      // Registra la tarea personalizada 'queryDatabase'
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
        },
        // Registra la tarea personalizada 'writeFile'
        writeFile({ filePath, content }) {
          fs.writeFileSync(path.resolve(filePath), content, 'utf8');
          return null;
        }
      });
    },
  }
});
