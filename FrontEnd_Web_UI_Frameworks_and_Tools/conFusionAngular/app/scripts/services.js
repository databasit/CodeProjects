'use strict';

angular.module('confusionApp')
//constan for json-server URL
.constant("baseURL","http://localhost:3000/")
.service('menuFactory',['$resource', 'baseURL', function ($resource,baseURL) {


      this.getDishes = function(){
            //return $resource(baseURL+"dishes/:id");
            return $resource(baseURL+"dishes/:id", null, {'get':{method:'GET'}});
       };

       this.getPromotion = function() {
             return $resource(baseURL+"promotions/:id");
         };

}])

.factory('corporateFactory',['$resource', 'baseURL', function ($resource,baseURL) {

  var corpfac = {};

   // get leaders from $resource
    corpfac.getLeaders = function() {
           return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
          };

   return corpfac;

}])

.factory('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {

      var feedbackFacSource = {};
       // get feedback from $resource
       feedbackFacSource.getFeedback = function() {
           return $resource(baseURL+"feedback/:id", null, {'update': {method:'PUT'}});
       };

    return feedbackFacSource;

}]);
