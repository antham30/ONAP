/**
 * 
 */

describe('ActionsMenuController', function() {
	
	beforeEach(module('ActionsMenuModule'));
	
	var $controller, actionsMenuService;
	
	beforeEach(inject(function(_$controller_, _actionsMenuService_) {
		$controller = _$controller_;
		actionsMenuService = _actionsMenuService_;
	}));
	
	describe('setViewMode', function() {
		it('should set the view mode', function() {
			var controller = $controller('ActionsMenuController');
			var mode = 'REGISTER_CASE';
			controller.setViewMode(mode);
			expect(actionsMenuService.getViewMode()).toEqual(mode);
		});
	});
});