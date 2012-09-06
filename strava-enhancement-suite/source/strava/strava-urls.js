var StravaUrls = {};

StravaUrls.rideUrl = function(rideId) {
	return 'http://app.strava.com/rides/{0}'.format([rideId]);
};

StravaUrls.athleteUrl = function(athleteId) {
	return 'http://app.strava.com/athletes/{0}'.format([athleteId]);
};

StravaUrls.dashboardUrl = function() {
	return 'http://app.strava.com/dashboard';
};

StravaUrls.segmentUrl = function(segmentId) {
	return 'http://app.strava.com/segments/{0}'.format([segmentId]);
};

StravaUrls.effortUrl = function(rideId, segmentId) {
	return 'http://app.strava.com/rides/{0}#{1}'.format([rideId, segmentId]);
};
