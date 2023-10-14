// 

const express = require('express');
const morgan = require("morgan");
const database = require("./app/database");
const cors = require("cors");
const path = require('path');

//

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

//Middlewares
// app.use(cors({
//     origin: ["http://127.0.0.1:5501","http://127.0.0.1:5500"] // a tener en cuenta para modificar
// }))
// app.use(morgan("dev"));

// Rutas (video login)
// app.get("/",(req,res)=> res.sendFile(__dirname+ "/pages/login.html"));
// app.get("/register",(req,res)=> res.sendFile(__dirname+ "/pages/register.html"));

 
//Rutas (video mysql)
// app.get("/productos", async (req,res) =>{
//     const connection = await database.getConnection();
//     const result = await connection.query("SELECT * FROM itemscommerce");
//     res.json(result)
// });

//video programación 2021
//metodos admitidos
// app.get('/', (req, res) => {
//     res.send('<h1>PAGINA PRINCIPAL</h1>');
//     console.log('Estamos en la ruta principal del sitio')
// })


    // busca el elemento cuyo id sea igual al parametro 

// app.get('/productos/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const producto = productos.find(product => product.id === id);
//     res.json(`${JSON.stringify(producto)} - ${producto.id}- ${producto.nombre}`);
// })
    
    // metodo de array(find) /buscamos de los objetos traidos aquel product.id === id
    //const producto = productos.find(product => product.nombre === id); /tmb es posible usar nombre
    // === estricto
   
    // en vez de id usamos p 
// app.get('/productos/:parametro', (req, res) => {
//     const p = Number(req.params.parametro);
//     const producto = productos.find(product => product.id === p);
//     res.json(`${JSON.stringify(producto)} - ${producto.id}- ${producto.nombre}`);
// })
    
    //mostrar en navegador
    //res.send(producto);
    //response.json(producto);
    
    // JSON.stringify() The JSON.stringify() static method converts a JavaScript value to a JSON string, optionally replacing
    //values if a replacer function is specified or optionally including only the specified properties if a replacer array is 
    //specified

    //para metodo delete post
    // extendion Thunder Client
    // similar a postman

// app.delete('/productos/:parametro', (req, res) => {
//     const p = Number(req.params.parametro);
//     const producto = productos.filter(product => product.id !== p);
//     res.json(producto);

    //en vez de find(get) usamos metodo filter

    // const producto = productos.filter(product => product.id === p);
    // const producto = productos.filter(product => product.id !== p); /crear array quitando objeto
    
// })


// app.use(express.json());

// app.post('/productos/:parametro', (req, res) => {
//     const p = Number(req.params.parametro);
//     const producto = productos.filter(product => product.id !== p);
//     res.json(producto);
// })

// app.post('/productoss', (req, res) => {
//     res.json("estoy aqui");
// })

// Uso del PATH EVITA CONFLICTOS A LA HORA DE LLAMAR DIRECTORIOS EN DISTINTOS SISTEMAS OPERATIVOS WINDOWS O LINUX

// const getEmployees = async (req, res) => {
//     try {
//         const connection = await database.getConnection();
//         const [result] = await connection.query("SELECT * FROM itemscommerce");
//         res.json(result);
//     } catch (error) {
//       return res.status(500).json({ message: "Something goes wrong" });
//     }
//   };

// app.get("/productos", async (req,res) =>{
//     const connection = await database.getConnection();
//     const result = await connection.query("SELECT * FROM itemscommerce");
//     res.json(result)
// });

// app.get('/productos/:id', async (req, res) => {
//     const id = Number(req.params.id);

//     const connection = await database.getConnection();
//     const result = await connection.query("SELECT * FROM itemscommerce");


//     const producto = result.find(product => product.id === id);
//     res.send(
//         div.innerHTML = `
//         <div class="producto-detalles">
//             <h3 class="producto-titulo">${producto.name}</h3>
//             <p class="producto-precio">$${producto.price}</p>
//         </div>
//     `);

// })



  // x parametro: id
  // Respuesta con Json

  /* app.get('/productos/:id', async (req, res) => {
    const id = Number(req.params.id);
  
    try {
      const connection = await database.getConnection();
      const result = await connection.query("SELECT * FROM itemscommerce WHERE id = ?", [id]);
  
      if (result.length === 0) {
        res.status(404).json({ error: 'Product not found.' });
      } else {
        const producto = result[0];
        res.json({
          producto: {
            name: producto.name,
            price: producto.price,
            id: producto.id,
          }
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the product.' });
    }
  }); */


// Respuesta con Html  

/*
  app.get('/productos/:id', async (req, res) => {
    const id = Number(req.params.id);
  
    try {
      const connection = await database.getConnection();
      const result = await connection.query("SELECT * FROM itemscommerce WHERE id = ?", [id]);
  
      if (result.length === 0) {
        res.status(404).send('Producto no encontrado.');
      } else {
        const producto = result[0];
  
        // Construye una respuesta HTML para mostrar los detalles del producto
        let htmlResponse = `<html><body><h3>${producto.name}</h3><p>$${producto.price}</p></body></html>`;
  
        res.send(htmlResponse);
      }
    } catch (error) {
      res.status(500).send('Se produjo un error al obtener el producto.');
    }
  }); */