const express = require('express');  // Inicializamos express y asignamos a una variable
const morgan = require('morgan');
const {engine} = require('express-handlebars'); //cuidar esta sintaxis //tutorial falla aqui
const path = require('path'); //trabajar con directorios //utilizo el modulo path
const { Result } = require('express-validator');
// const database = require("./database"); 


//initializations / inicializaciones
const app = express(); // Ejecución de express y guardamos el objeto () en variable

//settings / configuraciones que necesita mi servidor de express
app.set('port',process.env.port || 3000); // puerto en el que va despegar mi aplicación /toma un puerto por defecto o el puerto 3000
app.set('views', path.join(__dirname, 'views')); //por defecto la carpeta index se encuentra al inicio de la app al modificar esto es necesario indicar 
//metodo join nos permite encontrar la carpeta views en este caso

app.engine('.hbs', engine({ //objeto para poder configurar
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), // Indicamos dirección de layouts // modulo path: nos permite unir directorios 
    //metodo join nos permite encontrar la carpeta layouts 
    // que se encuentra dentro de views
    partialsDir: path.join(app.get('views'), 'partials'), //pedazos de codigos que podemos reutilizar en nuestras vistas
    extname: '.hbs', //nombre que tendran los archivos de handlebars
    helpers: require('./lib/handlebars') //en Handlebars vamos a utilizar algunas funciones
    //funciones para procesar una fecha u utro servicio fuera de lo que es handlebars
})); // herramienta handlebars

app.set('view engine', '.hbs'); // configuracion para utilizar nuestro motor

// Middlewares /funciones que se ejecutan cuando un usuario envia una peticion
app.use(morgan('dev'));  // Muestra las peticiones que van llegando desde el servidor /dev -> parametro
app.use(express.urlencoded({extended: false})); //urluncode poder aceptar formularios y datos enviados por usuarios /false: no acepta imagenes
app.use(express.json()); //aplicacion cliente enviando y recibiendo json

// app.use(session({
//     secret: 'faztmysqlnodemysql',
//     resave: false,
//     saveUninitialized: false,
//     store: new MySQLStore(database)
// }));

// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(validator());

// Global Variables / Variables que toda mi aplicación necesita /ej: Información del usuario
// middlewares global

//flass is not a function revisar documentación
// app.use((req, res, next) => { //request /response /next
//     app.locals.success = req.flash('success');
//     app.locals.message = req.flash('message');
//     app.locals.user = req.user;
//     next(); //toma información del usuario, lo que el servidor quiere responder, y una orden para continuar con el resto de codigo
// });

//Routes  / URL de nuestro servidor
//-principales
app.use(require('./routes/index')); // busca de modo automatico index.js al llamarse de esta forma // Desde la carpeta routes solicito mi archivo 'index.js'

//-para autentificar al usuario
// app.use(require('./routes/authentication'));
//-para enlaces (links) /signout/singin/logout/login

//NECESITA BORRAR/CORRREGIRSE

app.use('/links', require('./routes/links'));

//Public / Archivos públicos:aquel código al que el navegador puede acceder
app.use(express.static(path.join(__dirname,'public')));

// Starting the Server
app.listen(app.get('port'),() => { //usamos el puerto que definimos anteriormente (app.get('port'))
    console.log('Server on port', app.get('port'));
})
