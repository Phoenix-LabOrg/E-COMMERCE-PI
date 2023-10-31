// Ruta para guardar enlaces, utilizarlos o eliminarlos //no aplica a nuestro proyecto

const express = require('express');
const router = express.Router();

const pool = require('../database') //solo le cambio de nombre

router.get('/add', (req, res) => {
    res.render('links/add') //render/para recibir desde el servidor
})

module.exports = router;