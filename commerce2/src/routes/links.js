const express = require('express');
const router = express.Router();

const database = require('../databases');
// const pool = require('../database');

router.get("/productos", async (req, res) => {
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


module.exports = router;