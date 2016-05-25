'use strict';


var app = angular.module('DnDApp', ['ngMaterial']);

 app.controller('DnDController', function($scope) {

 $scope.DnD = function(drag,drop){

var drag = document.getElementById(drag);
var drop = document.getElementById(drop);

drag.ondragstart = function(e){
 //save ID element to transfer element drop
  e.dataTransfer.setData("container", e.target.id);
}

drop.ondragover = function(e){
  //cancel to element so we can drop
  e.preventDefault();
}

drop.ondrop = function(e){
//obtain the data through container key,in  this case the "id"
var id = e.dataTransfer.getData("container");
e.target.appendChild(document.getElementById(id));
   }

 }

 })

window.onload = function(){
 DnD("drag", "drop1");
}
