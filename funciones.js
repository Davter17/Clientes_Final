//Variables iniciales
buscando = false;

main = document.getElementById("articulos");
nombre = document.getElementById("nombre");
buscar = document.getElementById("buscar");

buscador = document.getElementById("buscador");
prediccion = document.createElement("div");
buscador.appendChild(prediccion);

//Listeners
document.addEventListener("DOMContentLoaded", function(){
    cargar_productos_index();
});
nombre.addEventListener("input", function(){
    cargar_productos_index();
})
buscar.addEventListener("click", function(){
    cargar_productos_index();
})

//Funcion que llama a la función princial
function cargar_productos_index(){
    if (buscando == false){

        //Limpieza de valores
        buscando = true;
        main.innerHTML = '';
        prediccion.innerHTML = '';

        //Tratamiento del gif
        gif = document.createElement("img");
        gif.src = "images/cargando.gif";
        gif.title = "Cargando";
        gif.title = "Cargando";
        gif.classList = "gif";
        main.appendChild(gif);

        //Llamada a la función principal con retraso
        interval = setInterval("cargar_productos()", 1000);
    }
}

//Función principal
function cargar_productos(){

    //Ajax
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function (){

        if (this.readyState == 4 && this.status == 200){

            //Reseteo de variables
            buscando = false;
            main.innerHTML = '';
            clearInterval(interval);

            //Tratamiento de respuesta
            let response = JSON.parse(this.responseText);
            
            if (response.length != 0){

                for (let i = 0; i < response.length; i++){

                    //Tratamiendo del teclado predictivo
                    if (document.getElementById("nombre").value != ''){
                        p_prediccion = document.createElement("p");
                        p_prediccion.innerHTML = response[i].modelo;
                        p_prediccion.addEventListener("click", function(){
                            document.getElementById("nombre").value = response[i].modelo;
                            cargar_productos_index();
                        })
                        prediccion.appendChild(p_prediccion);
                    }

                    //Manejo del articulo principal
                    article = document.createElement("article");
                    article.id = "articulo" + (i+1);
                    article.classList.add("ui-widget");
                    main.appendChild(article); 
    
                    //Manejo de la imagen
                    img = document.createElement("img");
                    img.src = response[i].imagen;
                    img.alt = "Running " + response[i].modelo;
                    img.title = response[i].modelo;
                    article.appendChild(img);
                    
                    //Manejo del div principal
                    div = document.createElement("div");
                    div.classList.add("datos-productos");
                    article.appendChild(div);
    
                    //Maejo del div secundario
                    div2 = document.createElement("div");
                    div2.classList.add("colores-fav");
                    div.appendChild(div2);
    
                    //Manejo del label
                    label = document.createElement("label");
                    label.setAttribute("for", "color"+(i+1));
                    label.innerHTML = "Colores:";
                    div2.appendChild(label);
    
                    //Manejo del select
                    select = document.createElement("select");
                    select.name = "color" + (i+1);
                    select.id = "color" + (i+1);
                    select.classList.add("ui-widget", "ui-selectmenu-button")
    
                    for (let j = 0; j< response[i].colores.length; j++){
                        option = document.createElement("option");
                        option.value = response[i].colores[j].toLowerCase();
                        option.innerHTML = response[i].colores[j];
                        select.appendChild(option);
                    }
                    
                    div2.appendChild(select);
    
                    //Manejo del fav
                    img2 = document.createElement("img");
                    img2.src = "images/fav.jpg";
                    img2.alt = "Añadir a favoritos";
                    img2.title = "Añadir a favoritos";
                    div2.appendChild(img2);
    
                    //Manejo del div del modelo
                    div3 = document.createElement("div");
                    div3.id= "modelo" + (i+1);
                    div3.classList.add("modelo");
                    div3.innerHTML = response[i].modelo;
                    div2.appendChild(div3);
    
                    //Manejo del div de la descripción
                    div4 = document.createElement("div");
                    div4.id= "descripcion" + (i+1);
                    div4.classList.add("descripcion");
                    div4.innerHTML = response[i].descripcion;
                    div2.appendChild(div4);                
    
                    //Manejo del div del precio
                    div5 = document.createElement("div");
                    div5.id= "precio" + (i+1);
                    div5.classList.add("precio");
                    div5.innerHTML = "€ " + response[i].precio;
                    div2.appendChild(div5);  
    
                    //Manejo del botón
                    button = document.createElement("button");
                    button.addEventListener("click", function(){
                        cesta(response[i].modelo);
                    });
                    button.innerHTML = "Añadir a la cesta";
                    button.classList.add("ui-button", "ui-widget", "ui-corner-all");
                    div2.appendChild(button);
    
                }
            } else{
                //No hay productos
                p = document.createElement("p");
                p.innerHTML = "No hay productos con ese nombre.";
                p.style.color = "red";
                main.appendChild(p);
            }
        }
    }

    //Manejo de la Petición Ajax
    nombre = document.getElementById("nombre").value;

    if (nombre != '')   xhttp.open("GET", "productos.php?busqueda="+nombre, true);
    else                xhttp.open("GET", "productos.php?articulo=-1", true);

    xhttp.send();
    return false;
}

//función cesta
function cesta(modelo){
    alert(modelo + " añadida a la cesta");
}