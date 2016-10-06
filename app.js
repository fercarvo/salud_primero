var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var pdfmake = require('pdfmake');
mongoose.Promise = global.Promise; //esta linea es porque salia un advertencia de monggose

mongoose.connect('mongodb://dawadmin:admin@ds161505.mlab.com:61505/proyectodaw', function(err, db){
  if (err) {
    //return next(err);
    console.log(err);
    console.log("\nPlease restart the server");
  }else{
    console.log("Conexion existosa");
  }
});


require('./models/Paciente');
require('./models/Examen');
require('./models/Muestra');
require('./models/CentroMedico');
require('./models/Operario');
require('./models/Laboratorista');
require('./models/Admin');
require('./models/Imagen');
require('./models/Horario');
require('./models/Laboratorio');
require('./models/Resultado');



var routes = require('./routes/index');
var users = require('./routes/users');
var examenesRoutes = require('./routes/examenes');
var pacientesRoutes = require('./routes/pacientes');
var muestrasRoutes = require('./routes/muestras');
var centrosMedRoutes = require('./routes/centrosMed');
var laboratoriosRoutes = require('./routes/laboratorios');
var operariosRoutes = require('./routes/operarios');
var laboratoristasRoutes = require('./routes/laboratoristas');
var adminsRoutes = require('./routes/admins');
var resultadosRoutes = require('./routes/resultados');
var login = require('./routes/login');

var app = express();


var session = require('client-sessions');


app.use(session({
  cookieName: 'session',
  secret: 'olakeasequeriendoverquehayaquioquehace:v',
  duration: 60 * 60 * 1000,
  activeDuration: 60 * 60 * 1000,
  httpOnly: true,
  ephemeral: true
}));

app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    console.log("esta logoneado");
    next();
  } else {
    if (req.url == "/login" || 
      req.url == "/" || 
      req.url == "/styles/materialize.css" ||
      req.url == "/styles/style.css" ||  
      req.url == "/imagenes/sans.jpg" ||
      req.url == "/imagenes/fondo.jpg" ||
      req.url == "/imagenes/main1.jpg" ||
      req.url == "/imagenes/main2.jpg" ||
      req.url == "/imagenes/main3.jpg" ||
      req.url == "/scripts/materialize.js" ||
      req.url == "/scripts/init.js") {
      next();
    } else {
      console.log("no esta logoneado");
      //res.json({mensaje: 'no esta logoneado'});
      res.redirect("/");
      //next();
    }
  }
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/', examenesRoutes);
app.use('/', pacientesRoutes);
app.use('/', muestrasRoutes);
app.use('/', centrosMedRoutes);
app.use('/', laboratoriosRoutes);
app.use('/', operariosRoutes);
app.use('/', laboratoristasRoutes);
app.use('/', adminsRoutes);
app.use('/', login);
app.use('/', resultadosRoutes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;