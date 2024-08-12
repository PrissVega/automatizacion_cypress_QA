const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  projectId: 'zimznw',
  e2e: {
    setupNodeEvents(on, config) {
      // Registra la tarea personalizada 'writeFile'
      on('task', {
        writeFile({ filePath, content }) {
          fs.writeFileSync(path.resolve(filePath), content, 'utf8');
          return null;
        }
      });
      // Puedes registrar otras tareas aquí, si es necesario
    },
  }
});
