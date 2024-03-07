$(document).ready(function () {
    // Estilos de jQuery
    $("#articulos").sortable(); 
    $("#verCarrito").button();
    $("#buscar").button();

    // Efecto al seleccionar
    $(".producto").click(function() {
        $(this).toggleClass("selected");
    });

    // Efecto al pasar por encima (hover)
    $(".producto").hover(function() {
        $(this).css("border", "2px solid red");
    }, function() {
        $(this).css("border", "1px solid #ccc");
    });

});