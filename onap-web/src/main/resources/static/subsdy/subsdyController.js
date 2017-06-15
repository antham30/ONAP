/**
 * 
 */

'use strict';
 

angular.module('app').controller('SubsidyMaintainController', ['$scope','FlashService','Constants', 'SubsidyMaintanService', function($scope,FlashService,Constants, SubsidyMaintanService) {

    var self = this;
    self.defaultSubsidyRec = {sbsdyId:null,startDate:null,endDate: null, 
    		startJsDate:null,
    		endJsDate:null,
    		startDispDate:null,
    		endDispDate:null,
    		upfrntFeeRate:null,
    		annualFeeRate: null, 
    		sbsdyRate: null,
    		chrtYear : null,
    		createDate: new Date(),
    		crtdUser: '',
    		updtDate : new Date(),
    		updtedUser:'',
    		editable : false};
    
    self.createSubsidyRec = {sbsdyId:null,startDate:null,endDate: null, 
    		upfrntFeeRate:null,
    		annualFeeRate: null, 
    		sbsdyRate: null,
    		chrtYear : null,
    		createDate: new Date().getTime(),
    		crtdUser: '',
    		updtDate : new Date().getTime(),
    		updtedUser:''};
    self.subsidyRec= angular.copy(self.defaultSubsidyRec);
    self.subsidyRecs=[];
    self.editedRecsBuffer = [];
    self.editEnableIds=[];
 
    self.submit = submit;
    self.edit = edit;
    //self.remove = remove;
    self.reset = reset;
    self.add = add;
    self.originalForVal = [];
 
    fetchAllSubsidyRecs();
 
    function fetchAllSubsidyRecs(){
    	SubsidyMaintanService.fetchAllSubsidies()
            .then(
            function(d) {
                self.subsidyRecs = d;
                self.originalForVal =[];
                self.originalForVal = angular.copy(self.subsidyRecs);
                var editedOriginals = [];
                self.subsidyRecs.forEach(function(rec){
                	rec.startJsDate = new Date(rec.startDate);
                	rec.endJsDate = new Date(rec.endDate);
                	rec.startDispDate = (rec.startJsDate.getMonth() + 1) + '/' + 
                									rec.startJsDate.getUTCDate() + '/' +
                									rec.startJsDate.getFullYear();
                	rec.endDispDate = (rec.endJsDate.getMonth() + 1) + '/' + 
											rec.endJsDate.getUTCDate() + '/' +
												rec.endJsDate.getFullYear();
                	if(self.editEnableIds.indexOf(rec.sbsdyId) > -1){
                		rec.editable = true;
                		editedOriginals.push(angular.copy(rec));
                		copyRec(rec, getSubsidyRecForId(self.editedRecsBuffer, rec.sbsdyId));
                	}else
                		rec.editable = false;
                } );
                self.editedRecsBuffer = editedOriginals;
            },
            function(errResponse){
                console.error('Error while fetching Subsidy Records');
            }
        );
    }
    
    function validateOverLap(rec){
    	
    	var returnIndex = -1;
    	var startTime = new Date(rec.startDispDate).getTime();
    	var endTime = new Date(rec.endDispDate).getTime();
    	self.originalForVal.forEach(function(original){
    		
    		if(returnIndex == -1 && rec.sbsdyId !== original.sbsdyId &&
    				(((original.startDate < startTime && startTime < original.endDate) || 
							(original.startDate < endTime && endTime < original.endDate)) ||
					((original.startDate > startTime && endTime > original.startDate) || 
							(original.endDate < endTime && startTime < original.endDate)))){
    			returnIndex = original.sbsdyId;
    		}
    		
    	});
    	
    	return returnIndex;
    }
    
 
    function createSubsidy(subsidyRec){
    	SubsidyMaintanService.createSubsidyEntry(subsidyRec)
            .then(
            		fetchAllSubsidyRecs,
            function(errResponse){
                console.error('Error while creating Subsidy Maintainance');
            }
        );
    }
 
    function updateSubsidy(subsidyRec){
    	SubsidyMaintanService.updateSubsidyEntry(subsidyRec)
            .then(
            		fetchAllSubsidyRecs,
            function(errResponse){
                console.error('Error while updating User');
            }
        );
    }
 
    /*function deleteSubsidy(id){
    	SubsidyMaintanService.deleteUser(id)
            .then(
            fetchAllUsers,
            function(errResponse){
                console.error('Error while deleting User');
            }
        );
    }*/
	var newdate = new Date();
			var years = newdate.getFullYear() + 13;
			newdate.setDate( newdate.getDate()-1 );
			newdate.setFullYear( newdate.getFullYear() + 13 );
			//console.log("fgf:"+newdate);
			$scope.DatePick =function(index, sbsdyId){
			    

			      var idsdate="#"+index+"startDate";
			      //$(idsdate).datepicker("destroy");
			      $(idsdate).datepicker({
								maxPicks: 1,
								changeMonth : true,
								changeYear : true,
								 yearRange: '1917:'+years,
								maxDate:newdate,
								dateFormat: "mm/dd/yy",
			            onChangeMonthYear: function(year, month){
			            	var rec = self.subsidyRecs[index];
			            	if(rec.sbsdyId !== null){
			            		rec = getSubsidyRecForId(self.subsidyRecs, sbsdyId);
			            	}
			            	//getSubsidyRecForId(self.subsidyRecs, index);
			rec.chrtYear = year;
			if(month > 9)
			rec.chrtYear = rec.chrtYear + 1;
			            }
			                 });
							 var dateObj = new Date();
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var year = dateObj.getUTCFullYear();
			    		self.subsidyRecs[0].chrtYear = year;
						if(month > 9)
						self.subsidyRecs[0].chrtYear = self.subsidyRecs[0].chrtYear + 1;
			     $(idsdate).datepicker('show');

			}
$scope.endDatePick =function(index){
      

        var idsdate="#"+index+"endDate";
       //$(idsdate).datepicker("destroy");
        $(idsdate).datepicker({
        	maxPicks: 1,
					changeMonth : true,
					changeYear : true,
					yearRange: '1917:'+years,
					maxDate:newdate,
					dateFormat: "mm/dd/yy"
                   });
        $(idsdate).datepicker('show');
  
	}
    
   

    function getSubsidyRecForId(recs, sbsdyId){
    	var localSubsidyRec = null;
    	for(var i = 0; i < recs.length; i++){
            if(recs[i].sbsdyId === sbsdyId) {
            	localSubsidyRec = recs[i];
                break;
            }
        }
    	return localSubsidyRec;
    }
 /**  4 decimal string**/
$scope.currncy =function(index){
      

        var idsubsidyrate="#"+index+"subsidyrate";

$(idsubsidyrate).on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});
}
$scope.currncyannualFeeRate =function(index){
      

        var idannualFeeRate="#"+index+"annualFeeRate";

$(idannualFeeRate).on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});
}


function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "")
}


function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 4 numbers after decimal
    if (blur === "blur") {
      right_side += "0000";
    }
    
    // Limit decimal to only 4 digits
    right_side = right_side.substring(0, 4);

    // join number by .
    input_val = left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val =  input_val;
    
    // final formatting
    if (blur === "blur") {
      input_val += ".0000";
    }
  }
  
  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
 // caret_pos = updated_len - original_len + caret_pos;
 // input[0].setSelectionRange(caret_pos, caret_pos);
}

 /**  4 decimal string**/
 /**  3 decimal string**/
$scope.currncyUpfrntFeeRate =function(index){
      

        var idupfrntFeeRate="#"+index+"upfrntFeeRate";

$(idupfrntFeeRate).on({
    keyup: function() {
      formatCurrencyUpfrnt($(this));
    },
    blur: function() { 
      formatCurrencyUpfrnt($(this), "blur");
    }
});
}



function formatCurrencyUpfrnt(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 3 numbers after decimal
    if (blur === "blur") {
      right_side += "000";
    }
    
    // Limit decimal to only 3 digits
    right_side = right_side.substring(0, 3);

    // join number by .
    input_val = left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val =  input_val;
    
    // final formatting
    if (blur === "blur") {
      input_val += ".000";
    }
  }
  
  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
 // caret_pos = updated_len - original_len + caret_pos;
 // input[0].setSelectionRange(caret_pos, caret_pos);
}

 /**  3 decimal string**/

	function fillNonSavedToBuffer(sbsdyId){
	
		self.editedRecsBuffer = [];
		if(sbsdyId)
			self.editEnableIds.splice(self.editEnableIds.indexOf(sbsdyId), 1);
		self.subsidyRecs.forEach(function(rec){
			
			if(self.editEnableIds.indexOf(rec.sbsdyId) > -1){
				self.editedRecsBuffer.push(angular.copy(rec));
			}
			
		});
		
	}
	
	function requiredValidation(rec){
		if(!rec.startDispDate || !rec.endDispDate ||
    			!rec.upfrntFeeRate || !rec.annualFeeRate ||
    			!rec.sbsdyRate || !rec.chrtYear){
	    	//alert('All Fields Are Required');
			FlashService.error(Constants.ERROR_MESSAGES.ALL_FIELDS_REQUIRED);
	    	return false;
	    }
    
	    if(!(rec.upfrntFeeRate > 0 && rec.annualFeeRate > 0 &&
	    			rec.sbsdyRate > 0 && (''+ rec.chrtYear).length === 4)){
	    	FlashService.error(Constants.ERROR_MESSAGES.SUBSIDY_COHORT_ERROR);
	    	//alert('Please enter values for Rates greater than ZERO/Four digit Cohort Year');
	    	return false;
	    }
	    return true;
	}
	

    function submit(sbsdyId) {
    	var overlapIndex = -1;
        if(self.subsidyRecs[0].sbsdyId===null){
           // console.log('Saving New Subsidy Maintainance', self.subsidyRecs[0]);

            if(!requiredValidation(self.subsidyRecs[0])) return;
            
            self.subsidyRecs[0].startDate = new Date(self.subsidyRecs[0].startDispDate).getTime();
            self.subsidyRecs[0].endDate = new Date(self.subsidyRecs[0].endDispDate).getTime();
            self.createSubsidyRec.startDate = self.subsidyRecs[0].startDate;
            self.createSubsidyRec.endDate = self.subsidyRecs[0].endDate;
            self.createSubsidyRec.upfrntFeeRate = self.subsidyRecs[0].upfrntFeeRate;
            self.createSubsidyRec.annualFeeRate = self.subsidyRecs[0].annualFeeRate;
            self.createSubsidyRec.sbsdyRate = self.subsidyRecs[0].sbsdyRate;
            self.createSubsidyRec.chrtYear = self.subsidyRecs[0].chrtYear;
            fillNonSavedToBuffer(sbsdyId);
          //  overlapIndex = validateOverLap(self.createSubsidyRec);
		  overlapIndex = validateOverLap(self.subsidyRecs[0]);
            if(overlapIndex != -1){
            	FlashService.error("Date Range overlaps Subsidy Maintenance Record ID '" + overlapIndex + "'. Record was not Saved")
            	
            	return ;
            }
            if(self.createSubsidyRec.startDate < self.createSubsidyRec.endDate){
            	createSubsidy(self.createSubsidyRec);
            }else{
            	//alert('Start Date should be less than End Date')
            	FlashService.error(Constants.ERROR_MESSAGES.START_LT_END_REQUIRED);
            }
        }else{
        	var localSbsdyRec = getSubsidyRecForId(self.subsidyRecs, sbsdyId);
        	if(!requiredValidation(localSbsdyRec)) return;
        	localSbsdyRec.startDate = new Date(localSbsdyRec.startDispDate).getTime();
        	localSbsdyRec.endDate = new Date(localSbsdyRec.endDispDate).getTime();
        	overlapIndex = validateOverLap(localSbsdyRec);
            if(overlapIndex != -1){
            	FlashService.error("Date Range overlaps Subsidy Maintenance Record ID '" + overlapIndex + "'. Record was not Saved")
            	return ;
            }
        	if(localSbsdyRec.startDate < localSbsdyRec.endDate){
        		fillNonSavedToBuffer(sbsdyId);
        		updateSubsidy(localSbsdyRec);
        	}else{
            	//alert('Start Date should be less than End Date');
        		FlashService.error(Constants.ERROR_MESSAGES.START_LT_END_REQUIRED);
            }
        	// here to add validation Messages TODO
          //  console.log('User updated with id ', self.subsidyRec);
        }
        /*if(sbsdyId){
        	reset(sbsdyId);
        }*/
    }
 
    function edit(sbsdyId){
      //  console.log('sbsdyId to be edited', sbsdyId);
        var localSubsidyRec = getSubsidyRecForId(self.subsidyRecs, sbsdyId);
        self.editEnableIds.push(sbsdyId);
        self.editedRecsBuffer.push(angular.copy(localSubsidyRec));
        localSubsidyRec.editable = true;
        
    }
 
    /*function remove(sbsdyId){
        console.log('id to be deleted', id);
        if(self.user.id === id) {//clean form if the user to be deleted is shown there.
            reset();
        }
        deleteUser(id);
    }*/
 
 
    function reset(sbsdyId){
    	if(sbsdyId === null)
    		self.subsidyRecs = self.subsidyRecs.slice(1);
    	else{
    		var orignalRec = getSubsidyRecForId(self.editedRecsBuffer, sbsdyId);
    		var localSubsidyRec = getSubsidyRecForId(self.subsidyRecs, sbsdyId);
    		copyRec(localSubsidyRec, orignalRec);
    		self.editEnableIds.splice(self.editEnableIds.indexOf(sbsdyId), 1);
            localSubsidyRec.editable = false;
    	}
        //self.subsidyRec=angular.copy(self.defaultSubsidyRec);
        //$scope.subsidyForm.$setPristine(); //reset Form
    }
    
    function add(){
    	
    	if(self.subsidyRecs[0].sbsdyId === null){
    		//alert('Only one record can be added at a time');
    		FlashService.error(Constants.ERROR_MESSAGES.SUBSDY_ONLY_1_ERROR);
    		return;
    	}
    	else{
    		self.subsidyRec.editable = true;
    		self.subsidyRecs.splice(0, 0, angular.copy(self.subsidyRec));
    		
    	}
    }
    
    function copyRec(source, dest){
    	
    	if(!source || !dest)
    		return;
    	
    	source.startDispDate = dest.startDispDate;
    	source.endDispDate = dest.endDispDate;
    	source.upfrntFeeRate = dest.upfrntFeeRate;
    	source.annualFeeRate = dest.annualFeeRate;
    	source.sbsdyRate = dest.sbsdyRate;
    	source.chrtYear = dest.chrtYear;
    	
    }
 
}]);


