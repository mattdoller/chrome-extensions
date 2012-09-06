var StravaApi = function() {
};

(function() {
	
		// private methods
	function asyncGet(apiUrl, data) {
		var json = $.ajax({
			type: 'GET',
			url: apiUrl,
			data: data || {},
			async: false
		}).responseText;
		return $.parseJSON(json);
	};
	
	function asyncPost(apiUrl, data) {
		var json = $.ajax({
			type: 'POST',
			url: apiUrl,
			data: data || {},
			async: false
		}).responseText;
		return $.parseJSON(json);
	}
	
	this.login = function(email, password) {
		var api = 'https://app.strava.com/api/v2/authentication/login';
		var data = {
			email: email,
			password: password
		};
		return asyncPost(api, data);
	};
	
	this.findAthlete = function(athleteId, token) {
		var api = 'http://app.strava.com/api/v2/athletes/' + athleteId;
		var data = { token: token };
		return asyncGet(api, data);
	};
	
	this.findEffort = function(effortId) {
		var api = 'http://app.strava.com/api/v1/efforts/' + effortId;
		return asyncGet(api);
	};
	
	this.findRide = function(rideId) {
		var api = 'http://app.strava.com/api/v1/rides/' + rideId;
		return asyncGet(api);
	};
	
	this.findRideEfforts = function(rideId) {
		var api = 'http://app.strava.com/api/v2/rides/' + rideId + '/efforts';
		return asyncGet(api);
	};
	
	this.findRideStreams = function(rideId) {
		var api = 'http://app.strava.com/api/v1/streams/' + rideId;
		var data = { 'streams[]': (streams || []).join() };
		return asyncGet(api, data);
	};
	
	this.findSegment = function(segmentId) {
		var api = 'http://app.strava.com/api/v1/segments/' + segmentId;
		return asyncGet(api);
	};
	
	this.findSegmentEfforts = function(segmentId, data) {
		/*
			the data parameter can take a bunch of different params:
			- clubId
			- athleteId
			- athleteName
			- startDate - YYYY-MM-DD
			- endDate - YYYY-MM-DD
			- best - shows best times per athlete, sorted elapsed time
		*/

		var api = 'http://app.strava.com/api/v1/segments/' + segmentId + '/efforts';
		return this.asyncGet(api, data);
	};
	
}).call(StravaApi.prototype);