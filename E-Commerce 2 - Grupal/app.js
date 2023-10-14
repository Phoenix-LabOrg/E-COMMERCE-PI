const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('database.db');
const db = new sqlite3.Database('./services/database/database.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// Crea las tablas
//createTables(db);

// Configuración de Express y middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Ruta para el formulario de registro
app.get('/registro', (req, res) => {
  res.sendFile(__dirname + '/views/registro.html'); // Asegúrate de que la ruta sea correcta
});

//prueba


app.post('./views/registro/registrar'), async (req, res) => {
  // Accede a los datos del formulario a través de req.body
  const username =  req.body.username;
  const email =  req.body.email;
  const password =  req.body.password;
  // const password2 =  req.body.password2;

  // Verificar si las contraseñas son iguales
  if (password !== password2) {
    return res.status(400).send("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
  } else {
    return res.send("registro exitoso");  // Si las contraseñas coinciden, proceder a guardar en la base de datos
    db.run('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', [username, email, password], (err) => {
      if (err) {
        return console.error(err.message);
      } else {
        console.log('Usuario registrado con éxito');
        // Redirige al usuario a una página de inicio de sesión u otra página de confirmación aquí
        res.redirect('/pagina-de-inicio'); // Cambia '/pagina-de-inicio' a la ruta correcta
      }
    });
  }

}



// // Ruta para manejar el registro
// app.post('/registro/registrar', async (req, res) => {
//   // Lógica para registrar al usuario en la base de datos
//   // Accede a los datos del formulario a través de req.body
//   const username =  body.username;
//   const email = await req.body.email;
//   const password = await req.body.password;
//   const password2 = req.body.password2
  

//   // Ejemplo de inserción de datos en la base de datos SQLito
//   db.run('INSERT INTO usuarios (username, email, password, password2) VALUES (?, ?, ?, ?)', [username, email, password, password2], (err) => {
//     if (err) {
//       return console.error(err.message);
//     }else {
//       console.log('Usuario registrado con éxito');
//     } 
//           // Puedes redirigir al usuario a una página de inicio de sesión u otra página de confirmación aquí
//   });
// });



// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
