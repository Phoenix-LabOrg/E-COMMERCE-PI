module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },
    isNotLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            req.flash('message', 'Ahun no se identificado, Funcion no valida')
            return next();
        }
        return res.redirect('/');
    }
};