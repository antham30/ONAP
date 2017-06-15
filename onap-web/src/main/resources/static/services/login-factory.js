angular.module('app')
		.factory(
				'loginFactory',
				[
						'$q',
						'$http',
						'Constants',
						function($q, $http, Constants) {
							'use strict';
							var resource = {};
							resource.login = function(data) {
								return $http({
									method : 'POST',
									data : data,
									url : Constants.contextPath + '/user',
									headers : {
										"Content-Type" : "application/json",
										"Accept" : "application/json"
									}
								});
							};

							resource.getRole = function(userName) {
								var knownUsers = {
									lender : [ 'summer' ],
									olg : {
										supervisor: ['onapsupervisor@hud.gov'],
										staff: ['mthorpe',
										        'rfloyd',
												'sanderson',
												'twright',
												'jennpost',
												'jjin@credence-llc.com',
												'ama@credence-llc.com',
												'onapendorser1@hud.gov',
												'onapendorser2@hud.gov',
												'onapendorser3@hud.gov',
												'onapendorser4@hud.gov',
												'onapendorser5@hud.gov'
										],
										administrator: ['onapadmin@hud.gov']
									}
								};

								var isLender = knownUsers.lender
										.indexOf(userName) !== -1;
								var isOLG = knownUsers.olg.staff
										.indexOf(userName) !== -1;
								var isOLGSupervisor = knownUsers.olg.supervisor
										.indexOf(userName) !== -1;
								var isAdministrator = knownUsers.olg.administrator
										.indexOf(userName) !== -1;

								if (isOLG) {
									return 'OLG Endorser'
								} else if (isOLGSupervisor) {
									return 'OLG Supervisor'
								} else if (isAdministrator) {
									return 'Administrator';
								} else {
									return 'Lender'
								}
							}

							return resource;
						} ]);