<!DOCTYPE html>
<html>
<body>

<h1>The Console Object</h1>
<h2>The log() Method</h2>
<p>Remember to open the console (Press F12) before you click "Run".</p>

<script>

/*function ContarVocales(palabra){
	var contarVocales=0;
	palabra.split('').forEach(element=>{
    	if (element=='a' || element=='A'){
    		contarVocales++;
       	}
    	if (element=='e' || element=='E'){
    		contarVocales++;
       	}
     	if (element=='i' || element=='I'){
    		contarVocales++;
       	}
     	if (element=='o' || element=='O'){
    		contarVocales++;
       	}
     	if (element=='u' || element=='U'){
    		contarVocales++;
       	}
        
	});
	console.log(contarVocales);
 }
 var palabra='hola mundo';
 ContarVocales(palabra);

 
function contarPlabras(texto){
 	var contar=0;
    texto.split(' ').forEach(element=>{
    	contar++;
    });
    console.log(contar);
}
var texto='presta atencion Rafael';
contarPalabras(texto);
*/

function contarCaracteres(texto){
	var resultado=0;
    texto.split('').forEach(element=>{
    	resultado++;
        });
        console.log(resultado);
    
}
var texto = "hola mundo";
contarCaracteres(texto)
</script>

</body>
</html>