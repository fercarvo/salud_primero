var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //esta linea es porque salia un advertencia de monggose

mongoose.connect('mongodb://admin:admin@ds161505.mlab.com:61505/proyectodaw', function(err){
  if (err) {
    return next(err);
    console.log("conexion error");
  }else{
    console.log("conexion no error");
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
var login = require('./routes/login');

var app = express();


var session = require('client-sessions');


app.use(session({
  cookieName: 'session',
  secret: 'olakeasequeriendoverquehayaquioquehace:v',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  //secure: true,
  ephemeral: true
}));

app.use(function(req, res, next) {

app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    console.log("esta logoneado");
    next();
  } else {
    if (req.url == "/login" || req.url == "/" || req.url == "/styles/styles.css" || req.url == "/Imagenes/fondo.jpg" ) {
      next();
    } else {
      console.log();
      next(); // esto no va
      //res.redirect("/"); esto si va
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
