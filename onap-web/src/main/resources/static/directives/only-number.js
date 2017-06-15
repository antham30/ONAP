
angular.module('app').directive('numbersOnly', function () {
	'use strict';
	return {
	    require: 'ngModel',
	    link: function (scope, element, attrs, modelCtrl) {
		    modelCtrl.$parsers.push(function (inputValue) {
			    //if input value is undefined return empty
			    if (inputValue === undefined) {
				    return '';
			    }
			    //replace the input value with empty string if at all the entered value contains characters or special characters
			    var transformedInput = (inputValue) ? inputValue.replace(/[\D]/g, '') : '';
			    // sets view value of the model controller if the transformed input and input value are not same
			    if (transformedInput !== inputValue) {
				    modelCtrl.$setViewValue(transformedInput);
				    modelCtrl.$render();
			    }
			    return transformedInput;
		    });
	    }
	};
});