const  formulario = document.querySelector("#formulario");
const listaRecordatorios = document.querySelector("#listaRecordatorios");

let recordatorios = [];

eventListeners();

function eventListeners() {
    formulario.addEventListener("submit", agregarRecordatorio);

    //Cuando el documento este listo
    document.addEventListener("DOMContentLoaded", () =>{
        recordatorios = JSON.parse(localStorage.getItem("recordatorios")) || [];

        crearHTML();
    })
}




//Funciones
function agregarRecordatorio(event){
    event.preventDefault();

    const mensaje = document.querySelector("#mensaje").value;

    //Valudamos que no e este vacio
    if (mensaje === ""){
        mostrarError("No puede ir vacio")
       return
    }

    const recordatoriosObj = {
        id : Date.now(),
        texto: mensaje,
    }
    //Agregamos recordatorios
    recordatorios = [...recordatorios, recordatoriosObj];
    //Una vez agregado creamos el html
    crearHTML();
    //Reiniciamo el formulario
    formulario.reset();
}


//mostramos el error
function mostrarError(error){
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    formulario.appendChild(mensajeError);

    setTimeout (() =>{
        mensajeError.remove();
    }, 2000)
   
}

//Mostramos listados de recordatorios
function crearHTML(){
    limpiarHMTL();
    if(recordatorios.length > 0){
        recordatorios.forEach( mensaje => {
            //Agregamos boton para eliminar algun recordatorio
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar");
            btnEliminar.innerHTML = "X"
            //Añadimos la funcion eliminar
            btnEliminar.onclick = () => {
                borrarRecordatorio(mensaje.id);
            }


            //Creamos el HTML
            const li = document.createElement("li");
            //Añadimos dentro
            li.innerHTML = mensaje.texto;
            //Añadimos el boton
            li.appendChild(btnEliminar);
            



            listaRecordatorios.appendChild(li);
        })
    }

    sincronizarStorage();
}

//Agregamos los mensajes a localStorage
function sincronizarStorage(){
    localStorage.setItem("recordatorios", JSON.stringify(recordatorios))
}

//Borrar recordatorio
function borrarRecordatorio (id){
    recordatorios = recordatorios.filter( mensaje => mensaje.id !== id)
    crearHTML();
}

//Limpiamos html para que no se repita
function limpiarHMTL(){
    while(listaRecordatorios.firstChild){
        listaRecordatorios.removeChild(listaRecordatorios.firstChild)
    }
}