// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');

(function(angular) {
  'use strict';
angular.module('nlsChatApp', [])
  .controller('friendsListCtrl', ['$scope', function($scope, $http) {

   $scope.user;
   $scope.loggedIn = false;
   $scope.friendsList;

   $scope.getUsers = function(){
      $.ajax({
         url: "http://107.180.101.133:3000/users"
      }).done(function(data) {
         console.log(data);
         $scope.friendsList = data;
         $scope.$apply();
      });
   };

   $scope.getUsers();

   $scope.login = function(){
      $.ajax({
         url: "http://107.180.101.133:3000/login",
         data: {
            "username":$("#formUser").val(),
            "password":$("#formPassword").val()
         }
      }).done(function(data) {
         console.log(data);
         // get back item
         if(data.login==true){
            $scope.loggedIn = data.login;
            $scope.user = data.user;
            $scope.$apply();
         }
         else{
            alert("Username/Password is incorrect.");
         }
      });
   };

   $scope.msgFriend = function(friendID){
      console.log("id: "+friendID);
      const modalPath = path.join('file://', __dirname, 'message.html?friendID='+friendID+'&userID='+$scope.user._id)
      let win = new BrowserWindow({ width: 400, height: 320 })
      win.on('close', function () { win = null })
      win.loadURL(modalPath)
      win.show()
   };

   $scope.addUser = function(){
      $.ajax({
         url: "http://107.180.101.133:3000/addUser",
         data: {
            "user":$("#addName").val(),
            "email":$("#addEmail").val(),
            "password":$("#addPassword").val(),
            "admin":$scope.addAdmin,
            "allowed":$scope.addAllowed
         }
      }).done(function(data) {
         console.log(data);
      });
   };

  }]);
})(window.angular);
