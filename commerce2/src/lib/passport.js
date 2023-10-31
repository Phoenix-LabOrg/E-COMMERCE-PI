const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: 'true'
    }, async (req, username, password, done) => {
        console.log(req.body); // para ir conociendo como avanza y que se recibe
        pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length > 0) {
            const user = rows[0];
            const validPassword = await helpers.matchPassword(password, user.password);
            if (validPassword) {
                done(null, user, req.flash('success', Welcome + user.username));
            } else {
                done(null, user, req.flash('message', 'Incorrect Password'));
            }
        }else {
            return done(null, false, req.flash('message', 'The Username does not exist'));
        }
}));

passport.use('local.signup', new localStrategy({
    usernameField: 'username', 
    passportField: 'password',
    passReqCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };

    newUser.password = await helpers.encryptPassword(password); //usamos nuestro metodo en helpers para cifrar una de las variables
    const result = await pool.query('INSERT INTO users SET ?', [newUser]) //conexion/usuario 
    
    //aqui asignaremos un Id a mi usuario creado /vemos en propiedades de newUser y vemos este insertId
    newUser.id = result.insertId;
    return done(null, newUser); //utilizamos metodo creado para redirigir

}));

//usando passport (middleware)
// serializar usuario 

//https://youtu.be/qJ5R9WTW0_E?t=10055 //para guardar el usuario en session ??
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializar usuario /consultar para saber si mi user id existe
passport.deserializeUser(async (id, done) => {
    pool.query('SELECT * FROM users where id = ?', [id]);
    done(null, rows[0]); //null para error / 0 para escojer el indice 0 de un objeto
});
