'use strict'

var formulario = '<form method="post" action="/nacimiento">'
    + '<label for="edad">¿Qué edad tienes?</label>'
    + '<input type="text" name="edad" id="edad">'    
    + '<input type="submit" value="Enviar"/>'
    + '</form>';
 
var cabecera = '<h1>Naciste el año</h1>';

function getejemplo(req, res){
	res.send('<html><body>'
            + cabecera
            + formulario
            + '</html></body>'
    );
}
module.exports  = {
	getejemplo
}
