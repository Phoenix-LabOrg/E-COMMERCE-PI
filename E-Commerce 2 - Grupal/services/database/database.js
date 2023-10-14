const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./services/database/database.db');

module.exports = db;

class SQLiteConnection {
  constructor(dbPath) {
    this.dbPath = dbPath;
    this.db = new sqlite3.Database(this.dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
      } else {
        console.log('Connected to the SQLite database');
      }
    });
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Closed the database connection');
      }
    });
  }
}

// Ejemplo de uso
const dbPath = './services/database/database.db'; // Reemplaza con la ruta de tu base de datos


// Hacer consultas o ejecutar comandos SQL aquí
// Por ejemplo:
// db.db.run('CREATE TABLE users (id INT, name TEXT)');

// Cierra la conexión cuando hayas terminado
// db.close();

module.exports = SQLiteConnection;


