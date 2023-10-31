//declaro variables con sus respectivas bibliotecas y extensiones a usar
const express = require('express');
const database = require("./app/database"); //get/post
const app = express(); //get/post
const bodyParser = require('body-parser'); //post

//post
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());



app.set("port",3000);
app.listen(app.get("port"));
console.log("comunicación exitosa a traves del puerto",app.get("port"));

// Estableciendo directorio accesible por usuario
app.use(express.static(__dirname + "/public/tienda_integrador"));

//ARRAY DE PRODUCTOS
app.get("/productos", async (req, res) => {
  try {
    const connection = await database.getConnection();
    const result = await connection.query("SELECT * FROM productos");
    const productos = result.map((producto) => ({
      id: producto.producto_id,
      titulo: producto.titulo,
      imagen: producto.imagen,
      categoria: {
        nombre: producto.categoria_nombre,
        id: producto.categoria_id
      },
      precio: producto.precio
    }));
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  }
});

    
// REGISTRO DEL USUARIO
app.post(('/registrar'), async (req, res) => {
  // Accede a los datos del formulario a través de req.body

  const username =  req.body.username;
  const email =  req.body.email;
  const password =  req.body.password;
  const password2 =  req.body.password2;
  const usuario = {username, email, password};

  // Verificar si las contraseñas son iguales
  if (password !== password2) {
    return res.status(400).send("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
  } else {

    console.log(req.body);
  
    const connection = await database.getConnection();
  
      // Ahora puedes insertar los datos en la base de datos.
      await connection.query('INSERT INTO usuarios SET ?', usuario, (error, result) => {
        if(error)
        {
          
          throw error;
        }
        else
        {
          //devolvemos el id del usuario insertado
        }
      });
    return res.send("Usuario Registrado exitosamente");
  }

});