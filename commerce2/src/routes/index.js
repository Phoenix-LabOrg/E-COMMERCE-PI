const express = require('express'); // Requerimos Express para crear rutas
const router = express.Router(); // Metodo para devolver un objeto

router.get('/', (req, res) => {
    res.send('Hello World');
})

module.exports = router;