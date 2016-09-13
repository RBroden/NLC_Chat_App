function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

(function(angular) {
   'use strict';
   angular.module('nlsChatApp', [])
   .controller('messagesCtrl', ['$scope', function($scope, $http) {

      $scope.a = 5;
      $scope.user = getParameterByName('userID');
      $scope.friend = getParameterByName('friendID');
      $scope.createConvId = function(){
        let users = [$scope.user,$scope.friend];
        users.sort();
        return users.join('');
      };
      $scope.convId = $scope.createConvId();

      $scope.getMessages = function(){
        console.log($scope.convId);
        $.ajax({
           url: "http://107.180.101.133:3000/messages",
           data: {
              "convId":$scope.convId
           }
        }).done(function(data) {
           console.log(data);
        });
      };

      $scope.getMessages();

      $scope.sendMessage = function(){
        console.log($scope.message);
        $.ajax({
           url: "http://107.180.101.133:3000/sendMessage",
           data: {
              "message":$scope.message,
              "user":$scope.user,
              "convId":$scope.convId
           }
        }).done(function(data) {
           //console.log(data);
           $scope.message = "";
        });
      };

      // end of controller messagesCtrl

   }]);
})(window.angular);
