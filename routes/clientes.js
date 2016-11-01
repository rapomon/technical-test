
/*
 * Listado de clientes
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM clientes',function(err,rows)
        {
            
            if(err)
                console.log("Error al obtener %s ",err );

            res.render('clientes',{page_title:"Clientes",data:rows});
           
         });
    });
  
};

exports.prepare_add = function(req, res){
  res.render('nuevo_cliente',{page_title:"Nuevo cliente"});
};

/* Guarda un cliente */
exports.add = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            nombre    : input.nombre,
            direccion : input.direccion,
            email     : input.email,
            cif       : input.cif 
        
        };
        
        var query = connection.query("INSERT INTO clientes set ? ",data, function(err, rows) {

            data.id = rows.insertId;

            var json={
                "level":err?"ERROR":"SUCCESS",
                "message":err?"Error al insertar cliente %s "+err:"Cliente creado.",
                "data":data
            };

            res.contentType('application/json');
            res.send(json);
          
        });

    });
};

exports.prepare_edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM clientes WHERE id = ?',[id],function(err,rows) {
            
            if(err)
                console.log("Error al editar %s ",err );
     
            res.render('editar_cliente',{page_title:"Editar cliente",data:rows});

         });
    }); 
};

exports.edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            nombre    : input.nombre,
            direccion : input.direccion,
            email     : input.email,
            cif       : input.cif 
        
        };
        
        connection.query("UPDATE clientes set ? WHERE id = ? ",[data,id], function(err, rows) {

            data.id = id;

            var json={
                "level":err?"ERROR":"SUCCESS",
                "message":err?"Error al actualizar cliente %s "+err:"Cliente guardado.",
                "data":data
            };

            res.contentType('application/json');
            res.send(json);
          
        });
    
    });
};

exports.delete = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM clientes  WHERE id = ? ",[id], function(err, rows)
        {
            var json={
                "level":err?"ERROR":"SUCCESS",
                "message":err?"Error al eliminar cliente %s "+err:"Cliente eliminado."
            };

            res.contentType('application/json');
            res.send(json);
             
        });
        
     });
};
