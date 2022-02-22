function noVacio(elemento,condicion) {
    if (elemento.value === "" || condicion) {
      elemento.className = "form-control is-invalid";
      return false;
    } else {
      elemento.className = "form-control is-valid";
      return true;
    }
}

function validar(input,valor) {

    // valor = 1 --> validar texto
    // valor = 2 --> validar email
    // valor = 3 --> validar numero
    // valor = 4 --> validar cantidad de caracteres
    let b;
    let expresion = /\w+@\w+\.[a-z]{2,4}$/;

    switch(valor){
        case 1:
            noVacio(input,false);
            b = noVacio(input,false);
        break;
        case 2:
            noVacio(input,!expresion.test(input.value));
            b = noVacio(input,!expresion.test(input.value));
        break;
        case 3:
            noVacio(input,isNaN(input.value));
            b = noVacio(input,isNaN(input.value));
        break;
        case 4:
            noVacio(input,input.value.length <= 10);
            b = noVacio(input,input.value.length <= 10);
        break;
    }
    return b;
}

function validarGeneral(event){
    event.preventDefault();
    let alerta = document.getElementById('msjEnvio');

    if( validar(document.getElementById('nombre'),1) && validar(document.getElementById('email'),2) && validar(document.getElementById('telefono'),3) && validar(document.getElementById('consulta'),4) ){
        enviarEmail();
        alerta.className = 'alert alert-success mt-3';
        if(window.location.pathname === "/index.html"){
            alerta.innerHTML = 'Your message was submited correctly'; 
        }else if (window.location.pathname === "/spanishPage.html"){
            alerta.innerHTML = 'Su consulta fue enviada correctamente'; 
        }
    }else{
        alerta.className = 'alert alert-danger mt-3';
        if(window.location.pathname === "/index.html"){
            alerta.innerHTML = 'ERROR, checked the entered data.'; 
        }else if (window.location.pathname === "/spanishPage.html"){
            alerta.innerHTML = 'Ocurrio un error, verifique los datos ingresados.'; 
        }
    }
}





function enviarEmail(){
    emailjs.send("service_2qem7iv","template_l3vqgtj",{
        to_name: "Kevin",
        from_name: document.getElementById('nombre').value,
        message: `Nombre: ${document.getElementById('nombre').value} - Email: ${document.getElementById('email').value} - Telefono: ${document.getElementById('telefono').value} - Consulta: ${document.getElementById('consulta').value}`,
        }).then((response)=>{
            console.log(response);
        },(error)=>{
            console.log(error);
            alert("Ocurrió un error al enviar la consulta");
        })
}