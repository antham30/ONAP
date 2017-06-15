/*
 *
 * Dashboard functions
 *
 */

function buttonHighlighter(btn, state) {
	if (typeof btn != 'undefined') {

		if (state == true) {
			$(btn).children().find("span").css( "color", "black" );
			$(btn).children().find("i").css( "color", "black" );
		} else {
			$(btn).children().find("span").css( "color", "" );
			$(btn).children().find("i").css( "color", "" );
		}
	}
}

function showMyTeam() {
	
	setTimeout(function(){
		if (typeof myCasesBtn != 'undefined') {
			angular.element($('#dashboard')).scope().getTeamStatus();
		}
	}, 1000);

	if (typeof myTeamBtn != 'undefined') {

		$('#myTeamBtn').find("a").blur();
		$('.highLevelWidget').hide();
		$('#myTeamWidget').show();
	}
	
	if (typeof myTeamBtn != 'undefined') {
		buttonHighlighter(myTeamBtn, true);
	}
	
	if (typeof myCasesBtn != 'undefined') {
		buttonHighlighter(myCasesBtn, false);
	}
	
	if (typeof myTeamProgressBtn != 'undefined') {
		buttonHighlighter(myTeamProgressBtn, false);		
	}
	
	if (typeof myProgressBtn != 'undefined') {
		buttonHighlighter(myProgressBtn, false);
	}
}

function showMyCases() {
	angular.element($('#dashboard')).scope().getCases();
	$('#myCasesBtn').find("a").blur();
	$('.highLevelWidget').hide();
	$('#myCasesWidget').show();
	$('#myProgress').hide();
	
	if (typeof myTeamBtn != 'undefined') {
		buttonHighlighter(myTeamBtn, false);
	}
	
	if (typeof myCasesBtn != 'undefined') {
		buttonHighlighter(myCasesBtn, true);
	}
	
	if (typeof myTeamProgressBtn != 'undefined') {
		buttonHighlighter(myTeamProgressBtn, false);		
	}
	
	if (typeof myProgressBtn != 'undefined') {
		buttonHighlighter(myProgressBtn, false);
	}
}	

function showMyTeamProgress() {
	angular.element($('#dashboard')).scope().getTeamProgress();
	$('#myTeamProgressBtn').find("a").blur();
	$('.highLevelWidget').hide();
	$('#myTeamProgress').show();
	$('#myProgress').hide();

	
	if (typeof myTeamBtn != 'undefined') {
		buttonHighlighter(myTeamBtn, false);
	}
	
	if (typeof myCasesBtn != 'undefined') {
		buttonHighlighter(myCasesBtn, false);
	}
	
	if (typeof myTeamProgressBtn != 'undefined') {
		buttonHighlighter(myTeamProgressBtn, true);		
	}
	
	if (typeof myProgressBtn != 'undefined') {
		buttonHighlighter(myProgressBtn, false);
	}
}	

function showMyProgress() {
	angular.element($('#dashboard')).scope().getTeamProgress();
	$('#myProgressBtn').find("a").blur();
	$('.highLevelWidget').hide();
	$('#myTeamProgress').show();
	$('#myProgress').show();
	
	buttonHighlighter(myProgressBtn, true);
	
	if (typeof myTeamBtn != 'undefined') {
		buttonHighlighter(myTeamBtn, false);
	}
	
	if (typeof myCasesBtn != 'undefined') {
		buttonHighlighter(myCasesBtn, false);
	}
	
	if (typeof myTeamProgressBtn != 'undefined') {
		buttonHighlighter(myTeamProgressBtn, false);		
	}
}	

// end of Dashboard functions.  These will be moved to a prototype object later.

showTab = function(tabName, tabBodyName) {
	$('.tabs').removeClass("active");
	$('.tabBody').hide();
	$("#" + tabName).addClass("active");
	$("#" + tabBodyName).show();
};

generateEmail = function() {
	angular.element($("#CaseReviewStartReviewCtrl")).scope().sendEmail();
	showTab('geTab', 'emailTab');
};


// loan search page
$('#loanSearchView.loanId').click(function() {
    $('#lenderId').prop('readonly', true);
    $('#loanId').prop('readonly', false).val("");

});
$('#loanSearchView.lenderId').click(function() {
    $('#loanId').prop('readonly', true).val("");
    $('#lenderId').prop('readonly', false);
});

// Make header stick to top
$(function(){
	var getOffset = null;
	$(window).on('scroll', function(e) {
		if(!getOffset && $('#dashboardHeadMark').length > 0){
			getOffset = $('#dashboardHeadMark').offset().top;
		}
		var headerElement = $('#dashboardHead');
		if (headerElement.length > 0 && getOffset) {
			if ($(this).scrollTop() >= getOffset) {
				headerElement.addClass('sticky-header');
				$('tbody tr:first-child td').each(function(index, col){
					$('thead tr:first-child th').eq(index).outerWidth($(this).outerWidth());
				});
			}
			else {
				headerElement.removeClass('sticky-header');
			}
		}
	});
})