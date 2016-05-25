'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu =false;
    $scope.message = "Loading ...";

        //get dish using $resource REST API to get the data
        menuFactory.getDishes().query(
               function(response) {
                   $scope.dishes = response;
                   $scope.showMenu = true;
               },
               function(response) {
                   $scope.message = "Error: "+response.status + " " + response.statusText;
          });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };
}])

.controller('ContactController', ['$scope', function ($scope) {

    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };

    var channels = [{
        value: "tel",
        label: "Tel."
    }, {
        value: "Email",
        label: "Email"
    }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

}])

.controller('FeedbackController', ['$scope', function ($scope) {

    $scope.sendFeedback = function () {

        console.log($scope.feedback);

        if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        } else {
            $scope.invalidChannelSelection = false;
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };
            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
    };
}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {

     //$scope.dish = {};
     $scope.showDish = false;
     $scope.message ="Loading ...";

     //using $resource REST API to get the data: $stateParams
     $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
        .$promise.then(
            function(response){
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );
}])

.controller('DishCommentController',['$scope','menuFactory',function ($scope,menuFactory) {

    $scope.mycomment = {
        rating: 5,
        comment: "",
        author: "",
        date: ""
    };

    $scope.submitComment = function () {

        $scope.mycomment.date = new Date().toISOString();
        console.log($scope.mycomment);

        $scope.dish.comments.push($scope.mycomment);

        //update the submitComment() with the menuFactory service
        menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);

        $scope.commentForm.$setPristine();

        $scope.mycomment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };
     };
}])

// implement the IndexController and About Controller here
.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory)
    {

         $scope.showDish = false;
         $scope.showPromotion = false;
         $scope.message="Loading ...";

          //get dish
           $scope.dish = menuFactory.getDishes().query()
          .$promise.then(
              function(response){
                  $scope.dish = response;
                  $scope.showDish = true;
              },
              function(response) {
                  $scope.message = "Error: "+response.status + " " + response.statusText;
              }
          );

           //get promotions
           $scope.promotion = menuFactory.getPromotions().query()
          .$promise.then(
              function (response){
                  $scope.promotion = response;
                  $scope.showPromotion = true;
               },
              function(response){
                $scope.message = "Error: "+response.status + " " + response.statusText;
              }
          );


        var leader = corporateFactory.getLeaders();
        $scope.leader = leader;

}])

.controller('AboutController', ['$scope', '$stateParams', 'corporateFactory', function ($scope, $stateParams, corporateFactory)
    {
        //get all leaders
        $scope.leaders = corporateFactory.getLeaders();
        //get leader by array index
        var leader = corporateFactory.getLeader(parseInt($stateParams.id, 10));

}]);
