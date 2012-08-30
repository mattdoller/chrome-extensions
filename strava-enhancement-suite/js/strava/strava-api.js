var StravaApi = Class.$extend({
	__init__ : function() {
	},
	
	login : function(email, password) {
		var api = 'https://app.strava.com/api/v2/authentication/login';
		var data = {
			email: email,
			password: password
		};
		return this.asyncPost(api, data);
	},
	
	findAthlete : function(athleteId, token) {
		var api = 'http://app.strava.com/api/v2/athletes/' + athleteId;
		var data = { token: token };
		return this.asyncGet(api, data);
	},
	
	findEffort : function(effortId) {
		var api = 'http://app.strava.com/api/v1/efforts/' + effortId;
		return this.asyncGet(api);
	},
	
	findRide : function(rideId) {
		var api = 'http://app.strava.com/api/v1/rides/' + rideId;
		return this.asyncGet(api);
	},
	
	findRideEfforts : function(rideId) {
		var api = 'http://app.strava.com/api/v2/rides/' + rideId + 'efforts';
		return this.asyncGet(api);
	},
	
	findRideStreams : function(rideId, streams) {
		var api = 'http://app.strava.com/api/v1/streams/' + rideId;
		var data = { 'streams[]': (streams || []).join() };
		return this.asyncGet(api, data);
	},
	
	findSegment : function(segmentId) {
		var api = 'http://app.strava.com/api/v1/segments/' + segmentId;
		return this.asyncGet(api);
	},
	
	// private methods
	asyncGet : function(apiUrl, data) {
		return $.ajax({
			type: 'GET',
			url: apiUrl,
			data: data || {},
			async: false
		}).responseText;
	},
	
	asyncPost : function(apiUrl, data) {
		return $.ajax({
			type: 'POST',
			url: apiUrl,
			data: data || {},
			async: false
		}).responseText;
	}
});