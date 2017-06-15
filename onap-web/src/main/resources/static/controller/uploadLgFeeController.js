 
		
		
		angular.module('app').controller('uploadLgFeeController', function ($scope, $http, $window, $rootScope, $filter, LoggingService, Calculator, Constants, FlashService) {
	 var vm = this;
	  
	
	  $scope.uploadFile = function(){
         
                 var fd=new FormData();
       
        angular.forEach($scope.uploadingFile,function(uploadingFile){
        fd.append('uploadingFile',uploadingFile);
        });
		
		  $http.post('OLGAdmin/paygovreport/upload',fd,
                                                            {
                                                            transformRequest: angular.identity,
                                                            headers: {'Content-Type': undefined}
                                                            }).success(function(d){
                                                            console.log(d);
															 FlashService.success('Successfully Uploaded');
															 vm.showData = true;
															 vm.allDetails = d;
                                                            }).error(function () {
     
    FlashService.error('Only Excel(.xls) should be uploaded');
}); 


       }
            
              	
            
      
	
    });
	
	  
	  angular.module('app').directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              element.bind('change', function(){
              $parse(attrs.fileModel).assign(scope,element[0].files)
                 scope.$apply();
              });
           }
        };
    
         }]);
      
        
      	
		
		