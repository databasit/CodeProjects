'use strict';

angular.module('confusionApp')
//constan for json-server URL
.constant("baseURL","http://localhost:3000/")
.service('menuFactory',['$resource', 'baseURL',

function ($resource,baseURL) {


    this.getDishes = function () {
        //http srevice to return the dishes' data from json-server:http://localhost:3000/dishes
       return $resource(baseURL+"dishes/:id",null,  {'get':{method:'GET' }});

    };

    // implement a function named getPromotion
    // that returns a selected promotion.
    this.getPromotions = function () {
        //http://localhost:3000/promotions
        //return $resource (baseURL+"promotions/:id",null, {'get':{method:'GET'}});
        return $resource (baseURL+"promotions/:id",null, {'get':{method:'GET' }});
    };


}])

.factory('corporateFactory',['$resource', 'baseURL',

function ($resource,baseURL) {

 this.getLeaders = function () {
        //http srevice to return the dishes' data from json-server:http://localhost:3000/dishes
       return $resource (baseURL+"leadership/:id",null,  {'get':{method:'GET' }});

    };

}]);
