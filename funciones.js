buscando = false;

function cargar_productos_index(){
    if (buscando == false){
        interval = setInterval("cargar_productos()", 1000);
        buscando = true;

        var main = document.getElementById("articulos");
        main.innerHTML = '';
        p = document.createElement("p");
        p.innerHTML = "Cargando...";
        p.style.color = "blue";
        main.appendChild(p);
    }
}

function cargar_productos(){

    let main = document.getElementById("articulos");
    main.innerHTML = '';

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200){
            
            let response = JSON.parse(this.responseText);
            //console.log("Datos recibidos:" + response);
            
            clearInterval(interval);
            buscando = false;

            if (response.length != 0){

                for (let i = 0; i < response.length; i++){
                    article = document.createElement("article");
                    article.id = "articulo" + (i+1);
    
                    img = document.createElement("img");
                    img.src = response[i].imagen;
                    img.alt = "Running " + response[i].modelo;
                    img.title = response[i].modelo;
                    article.appendChild(img);
                    
                    div = document.createElement("div");
                    div.classList.add("datos-productos");
                    article.appendChild(div);
    
                    div2 = document.createElement("div");
                    div2.classList.add("colores-fav");
                    div.appendChild(div2);
    
                    label = document.createElement("label");
                    label.setAttribute("for", "color"+(i+1));
                    label.innerHTML = "Colores:";
                    div2.appendChild(label);
    
                    select = document.createElement("select");
                    select.name = "color" + (i+1);
                    select.id = "color" + (i+1);
    
                    for (let j = 0; j< response[i].colores.length; j++){
                        //console.log(response[i].colores[j]);
                        option = document.createElement("option");
                        option.value = response[i].colores[j].toLowerCase();
                        option.innerHTML = response[i].colores[j];
                        select.appendChild(option);
                    }
                    
                    div2.appendChild(select);
    
                    img2 = document.createElement("img");
                    img2.src = "images/fav.jpg";
                    img2.alt = "Añadir a favoritos";
                    img2.title = "Añadir a favoritos";
                    div2.appendChild(img2);
    
                    div3 = document.createElement("div");
                    div3.id= "modelo" + (i+1);
                    div3.classList.add("modelo");
                    div3.innerHTML = response[i].modelo;
                    div2.appendChild(div3);
    
                    div4 = document.createElement("div");
                    div4.id= "descripcion" + (i+1);
                    div4.classList.add("descripcion");
                    div4.innerHTML = response[i].descripcion;
                    div2.appendChild(div4);                
    
                    div5 = document.createElement("div");
                    div5.id= "precio" + (i+1);
                    div5.classList.add("precio");
                    div5.innerHTML = "€ " + response[i].precio;
                    div2.appendChild(div5);  
    
                    
                    button = document.createElement("button");
                    button.addEventListener("click", function(){
                        cesta(i+1);
                    });
                    button.innerHTML = "Añadir a la cesta";
                    div2.appendChild(button);
    
                    main.appendChild(article); 
    
                }
            } else{
                p = document.createElement("p");
                p.innerHTML = "No hay productos con ese nombre.";
                p.style.color = "red";
                main.appendChild(p);
            }
        }
    }

    
    nombre = document.getElementById("nombre").value;
    //console.log(nombre);

    if (nombre != ''){
        xhttp.open("GET", "productos.php?busqueda="+nombre, true);
    } else{
        xhttp.open("GET", "productos.php?articulo=-1", true);
    }

    xhttp.send();
    return false;
}

function cesta(num){
    alert(num);
}