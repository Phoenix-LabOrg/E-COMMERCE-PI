const express = require('express');
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path') //trabajar con directorios

//initializations / inicializaciones
const app = express();

//settings / configuraciones
app.set('port',process.env.port || 3000);
app.set('views', path.join(__dirname, 'views')); //join nos permite encontrar la carpeta views en este caso
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), //join nos permite encontrar la carpeta layouts en views
    partialsDir: path.join(app.get('views'), 'partials'), //pedazos de codigos que podemos reutilizar en nuestras vistas
    extname: '.hbs', //nombre que tendran los archivos de handlebars
    helpers: require('./lib/handlebars') //funciones para
})) // herramienta handlebars
app.set('views engine', '.hbs'); // configuracion para utilizar nuestro motor

// Middlewares /funciones que se ejecutan cuando un usuario envia una peticion
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //urluncode poder aceptar formularios y datos enviados por usuarios /false: no acepta imagenes
app.use(express.json());

//Global Variables
//middlewares global
app.use((req, res, next) => { //request /response /next
    
    next(); //toma información del usuario, lo que el servidor quiere responder, y una orden para continuar con el resto de codigo

});

//Routes 
//-principales
app.use(require('./routes')); // busca de modo automatico index.js
//-para autentificar al usuario
app.use(require('./routes/authentication'));
//-para enlaces (links) /signout/singin/logout/login
app.use('/links',require('./routes/links'));

//Public
app.use(express.static(path.join(__dirname,'public')));

// Starting the Server
app.listen(app.get('port'),() => {
    console.log('Server on port', app.get('port'));
})