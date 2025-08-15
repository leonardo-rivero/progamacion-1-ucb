
//sin return
function ejecutarAlgoritmo(){
    var mensaje="holaaaa";
    alert(mensaje);
}

//con alerta
function binarioADecimal(binario) {
    var decimal=0;
    for (let i = 0; i < binario.length; i++) {
    
        digitoBinario=binario[i];
        if(digitoBinario ==='1'){
            decimal=decimal*2+1;
        }
        else{
            decimal=decimal*2 + 0;
        }
    }
    alert(decimal);
}