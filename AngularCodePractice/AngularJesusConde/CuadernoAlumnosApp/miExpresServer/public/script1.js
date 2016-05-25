var app = angular.module("myApp", []);

 app.controller('AlumnosController', function($scope) {
   $scope.alumnos=[
   {nombre:"Juan Blanco",telefono:"99810",curso:"Segundo ESO",},
   {nombre:"Rosa Luxemburgo",telefono:"99817",curso:"Tercero ESO",},
   {nombre:"Ana Mariño",telefono:"998109",curso:"Primero ESO",},
   {nombre:"Carlos Barahona",telefono:"998102",curso:"Tercero ESO",},
 ];

 $scope.Save=function() {
    $scope.alumnos.push({nombre:$scope.nuevoAlumno.nombre, telefono:$scope.nuevoAlumno.telefono, curso:$scope.nuevoAlumno.curso});
    $scope.formVisibility=false;
    console.log($scope.formVisibility)
 }

 $scope.formVisibility=false;

 $scope.ShowForm=function() {
    $scope.formVisibility=true;
    $scope.nuevoAlumno.nombre = "";
    $scope.nuevoAlumno.telefono = "";
  	$scope.nuevoAlumno.curso = "";
    console.log($scope.formVisibility)
  }

})
