<?php

//Desactivar para que PHP devuelva errores y warnings
error_reporting(0);
//ini_set('display_errors','Off');

//error_reporting(E_ALL);
//ini_set("display_errors", 1);
 
header('Content-Type: text/html; charset=UTF-8;');

$myArray = array();

$myObj = new class{}; 

$myObj->id = "1";
$myObj->modelo = "GT-2000 12";
$myObj->imagen = "images/gt-2000_12black.jpg";
$myObj->colores = array("Negro", "Azul","Blanco");
$myObj->descripcion = "Zapatillas De Hombre";
$myObj->precio = 160.00;

array_push($myArray,$myObj);

$myObj = new class{}; 

$myObj->id = "2";
$myObj->modelo = "GT-2000 12 Lite";
$myObj->imagen = "images/gt-2000_12Lite.jpg";
$myObj->colores = array("Negro/Rosa");
$myObj->descripcion = "Zapatillas De Mujer";
$myObj->precio = 140.00;

array_push($myArray,$myObj);

$myObj = new class{}; 

$myObj->id = "3";
$myObj->modelo = "GT-2000 11";
$myObj->imagen = "images/gt-2000_12blue.jpg";
$myObj->colores = array("Cian", "Rojo","Morado","Dorado");
$myObj->descripcion = "Zapatillas De Hombre";
$myObj->precio = 110.00;

array_push($myArray,$myObj);

$myObj = new class{}; 

$myObj->id = "4";
$myObj->modelo = "GEL-NOOSA TRI 15 GS";
$myObj->imagen = "images/1014A311_800_SR_RT_GLB.webp";
$myObj->colores = array("Naranja", "Rosa","Amarillo");
$myObj->descripcion = "Zapatillas De Niño";
$myObj->precio = 70.00;

array_push($myArray,$myObj);

$id=$_REQUEST['articulo'];
$modelo=$_REQUEST['busqueda'];

if(!empty($id)){
	if($id==-1){
		$myJSON = json_encode($myArray);
		echo $myJSON;
	}else{
		foreach($myArray as $actual){
			if($id==$actual->id){
				$myJSON = json_encode($actual);
				echo $myJSON;
			}
		}
	}
}else if(!empty($modelo)){
	$respuesta = array();
	for($i=0;$i<count($myArray);$i++){
		if(strpos(strtoupper($myArray[$i]->modelo), strtoupper($modelo))!==false){
			array_push($respuesta,$myArray[$i]);
		}
	}
	$myJSON = json_encode($respuesta);
	echo $myJSON;
}

?>