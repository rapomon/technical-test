// Dependencias
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

// Cargamos los clientes
var clientes = require('./routes/clientes'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// Variables de entorno
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : 'raulpm',
        port : 3306,
        database:'demo_clientes'

    },'pool')

);

app.get('/', clientes.list);
app.get('/add', clientes.prepare_add);
app.post('/add', clientes.add);
app.get('/delete/:id', clientes.delete);
app.get('/edit/:id', clientes.prepare_edit);
app.post('/edit/:id',clientes.edit);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('http://localhost:' + app.get('port'));
});
