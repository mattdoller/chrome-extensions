var StravaUrls = {};

StravaUrls.rideUrl = function(rideId) {
	var url = 'http://app.strava.com/rides/{0}';
	return url.format([rideId]);
};

StravaUrls.athleteUrl = function(athleteId) {
	var url = 'http://app.strava.com/athletes/{0}';
	return url.format([athleteId]);
};

StravaUrls.dashboardUrl = function() {
	return 'http://app.strava.com/dashboard';
};

StravaUrls.segmentUrl = function(segmentId) {
	var url = 'http://app.strava.com/segments/{0}';
	return url.format([segmentId]);
};

StravaUrls.effortUrl = function(rideId, segmentId) {
	var url = 'http://app.strava.com/rides/{0}#{1}';
	return url.format([rideId, segmentId]);
};