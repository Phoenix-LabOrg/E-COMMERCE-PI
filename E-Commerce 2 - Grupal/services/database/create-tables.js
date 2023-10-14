const db = require("./database"); // Asegúrate de que la ruta sea correcta

db.serialize(() => {
  // Crea la tabla de usuarios
  db.run(`
  CREATE TABLE "users" (
    "id"	INTEGER,
    "username"	TEXT NOT NULL,
    "email"	TEXT NOT NULL,
    "password"	TEXT NOT NULL,
    "password2"	TEXT NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT)
  );
  `);
});
