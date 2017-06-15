angular.module('app').directive('preventTypingGreater', function () {
	'use strict';
	return {
	    require: 'ngModel',
	    link: function(scope, element, attributes) {
	        	var oldVal = element.val() || "";
	        	element.on("keydown keyup", function(e) {
	        		if(attributes.max){
		        		if (Number(element.val()) > Number(attributes.max) &&
		        				e.keyCode != 46 // delete
		        				&&
		        				e.keyCode != 8 // backspace
		        		) {
		        			e.preventDefault();
		        			element.val(oldVal);
		        			return false;
		        		} else {
		        			oldVal = element.val();
		        		}
	        		}
	        	});
	    }
	};
});