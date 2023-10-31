// Ruta para signin signup signout // lo que sera la autentificación del usuario

const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', (req, res) => {
    res.render('auth/aignin');
});

router.post('/signin', (req, res) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true //FAILURE FLASH MENSAJES A LA VISTA
    }); (req, res, next);
});

router.get('/profile', (req, res) => {
    res.render('profile'); //como no esta dentro de una carpeta solo nombro la vista
});

module.exports = router;