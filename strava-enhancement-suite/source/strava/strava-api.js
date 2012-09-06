var StravaApi = function() {
};

(function() {

	// private methods
	function ajax(type, apiUrl, data, callbacks) {

		callbacks = (callbacks || {});
		var complete = (callbacks.complete || function (xhr, status) {});
		var success = (callbacks.success || function (data, status, xhr) {});
		var error = (callbacks.error || function (xhr, status, errorThrown) {}); 

		$.ajax({
			type: type,
			url: apiUrl,
			data: data,
			complete: complete,
			success: success,
			error: error
		});

	};
		
	this.login = function(email, password, callbacks) {
		var api = 'https://app.strava.com/api/v2/authentication/login';
		var data = { 
			email: email, 
			password: password 
		};		
		ajax('POST', api, data, callbacks);
	};
	
	this.findAthlete = function(athleteId, token, callbacks) {
		var api = 'http://app.strava.com/api/v2/athletes/{0}'.format([athleteId]);
		var data = { 
			token: token 
		};
		ajax('GET', api, data, callbacks);
	};
	
	this.findEffort = function(effortId, callbacks) {
		var api = 'http://app.strava.com/api/v1/efforts/{0}'.format([effortId]);
		ajax('GET', api, {}, callbacks);
	};
	
	this.findRide = function(rideId, callbacks) {
		var api = 'http://app.strava.com/api/v1/rides/{0}'.format([rideId]);
		ajax('GET', api, {}, callbacks);
	};
	
	this.findRideEfforts = function(rideId, callbacks) {
		var api = 'http://app.strava.com/api/v2/rides/{0}/efforts'.format([rideId]);
		ajax('GET', api, {}, callbacks);
	};
	
	this.findRideStreams = function(rideId, streams, callbacks) {
		var api = 'http://app.strava.com/api/v1/streams/{0}'.format([rideId]);
		var data = { 
			'streams[]': (streams || []).join()
		};
		ajax('GET', api, data, callbacks);
	};
	
	this.findSegment = function(segmentId, callbacks) {
		var api = 'http://app.strava.com/api/v1/segments/{0}'.format([segmentId]);
		ajax('GET', api, {}, callbacks);
	};
	
	this.findSegmentEfforts = function(segmentId, data, callbacks) {
		/*
			the data parameter can take a bunch of different params:
			- clubId
			- athleteId
			- athleteName
			- startDate - YYYY-MM-DD
			- endDate - YYYY-MM-DD
			- best - shows best times per athlete, sorted elapsed time
		*/

		var api = 'http://app.strava.com/api/v1/segments/{0}/efforts'.format([segmentId]);
		ajax('GET', api, data, callbacks);
	};
	
}).call(StravaApi.prototype);
