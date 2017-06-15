angular.module('app').controller('loginController', ['$rootScope', '$scope', '$timeout', 'loginFactory', '$location','FlashService', 
         'LoggingService', '$window', '$http', function($rootScope, $scope, $timeout, loginFactory, $location,FlashService, ls, $window, $http) {
    'use strict';
    var lc = this;
    var lcScope = $scope;
    lc.data = {
    		formSubmitted: false
    };
    lc.model={};
 
	  $rootScope.userInfo  = JSON.parse($window.sessionStorage.getItem("activeUser"));
	 if( $rootScope.userInfo ){
		
        $rootScope.userName =  $rootScope.userInfo .loggedUser;
		$rootScope.showloginhead = true;
    }else{
        $rootScope.showloginhead = false;
    }
    lc.onLogin = function(){
    	
    	var iv = "00000000000000000000000000000000";
		var salt = "00000000000000000000000000000000";
		var keySize = 128;
		var iterationCount = 10000;
		var pPhrase = "aesalgoisbestbes";
		var aesUtil = new AesUtil(keySize, iterationCount);
		var encrypt = aesUtil.encrypt(salt, iv, pPhrase, lc.model.userPwd);
		lc.model.userPwd = encrypt;
    	lc.data.formSubmitted = true;
      
      if(lcScope.loginForm.$valid){ 	  
       loginFactory.login(lc.model).then(function(response){
    	   if(response.data.status == "SUCCESS"){
    	   if(response.data.message != -1){
    		   
    		   $rootScope.abc = response.data.message;
    		   var user = ls.loginUser(lc.model.userLogOn, $rootScope.abc.split('##')[2]);
    		   var lenderName = $rootScope.abc.split('##')[3];
			   $window.sessionStorage.setItem("activeUser", JSON.stringify(user));
			   /**
			    * Prevent changing  of the logged user in the console
			    */
			   $rootScope.$watch(function() {
				   return $window.sessionStorage.getItem("activeUser");
			   }, function(newValue, oldValue) {
				      var newJson = JSON.parse(newValue);
					  var oldJson = JSON.parse(oldValue);
					  if (newJson && oldJson) {
						  if (newJson.loggedUser !== oldJson.loggedUser) {
					    	ls.logoutUser(JSON.parse($window.sessionStorage.getItem("activeUser")));
					    	$window.sessionStorage.clear();
					    	$rootScope.abc = undefined;
						  }
					  }
				   }); 
			   $window.sessionStorage.setItem("lenderName", JSON.stringify(lenderName));
			   $window.sessionStorage.setItem("abc", JSON.stringify($rootScope.abc ));
			   $rootScope.role = loginFactory.getRole(JSON.parse($window.sessionStorage.activeUser).loggedUser);
			   sessionStorage.setItem('role', $rootScope.role);
			   if($rootScope.role == 'OLG Endorser' || $rootScope.role == 'OLG Supervisor'){
				   $location.path( "/olgDashboard");
			   }
			   else if ($rootScope.role == 'Administrator') {
				   $location.path("/olgCasesDashboard");
			   }
			   else{
	    		   $location.path( "/lenderDashboard");
			   }
    		   $rootScope.showloginhead = true;
    		   $rootScope.userInfo  = JSON.parse($window.sessionStorage.getItem("activeUser"));
			   $rootScope.userName = $rootScope.userInfo.loggedUser;

			 }
    	   else {
    		   FlashService.error("Invalid Username/Password. Please enter correct credentials.");
    		   $location.path( "/");
    	   }
       } else{
    	   FlashService.error(response.data.errorMessage);
       }
       }); 
      }  
    };

    lc.onReset = function(){
      lc.model = {};
      lc.model.userLogOn='';
      lcScope.loginForm.$error={};
      lcScope.loginForm.$setPristine();  
    };

}]);