//get /post
const express = require('express');
const database = require("./app/database");
//post
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());


const app = express();
app.set("port",3000);
app.listen(app.get("port"));
console.log("comunicación exitosa a traves del puerto",app.get("port"));

// Estableciendo directorio accesible por usuario
app.use(express.static(__dirname + "/public/tienda_integrador"));


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







app.post(('/registrar'), async (req, res) => {
  // Accede a los datos del formulario a través de req.body
  const {username, email, password} =  req.body;

  const usuario = {username, email, password};

  console.log(req.body);

  const connection = await database.getConnection();

    // Ahora puedes insertar los datos en la base de datos.
    connection.query('INSERT INTO usuarios SET ?', usuario, function(error, result) {
      if(error)
			{
				
				throw error;
			}
			else
			{
				//devolvemos el id del usuario insertado
			}
    });
    //redireccionar a otra pagina/ proximamente
});
    