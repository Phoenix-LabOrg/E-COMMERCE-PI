const express = require('express');
const router = express.Router(); // Metodo para devolver un objeto

router.get('/', (req, res) => {
    res.send('Hello World');
})

module.exports = router;