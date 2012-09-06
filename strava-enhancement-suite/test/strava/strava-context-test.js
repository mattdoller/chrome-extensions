test('StravaContext tests', function() {

	var context = new StravaContext('http://app.strava.com/rides/123');
	equal(context.rideId(), 123, 'rideId is extracted from rides page');

	context = new StravaContext('http://app.strava.com/activities/1234');
	equal(context.rideId(), 1234, 'rideId is extracted from activities page');
	
	context = new StravaContext('http://app.strava.com/segments/456');
	equal(context.segmentId(), 456, 'segmentId is extracted from segment page');

	context = new StravaContext('http://app.strava.com/athletes/789');
	equal(context.athleteId(), 789, 'athleteId is extracted from athlete page');
	
	// try some cases with a hash
	context = new StravaContext('http://app.strava.com/rides/123#456');
	equal(context.rideId(), 123, 'rideId is extracted from ride page with hash info in url');

	context = new StravaContext('http://app.strava.com/segments/456#def');
	equal(context.segmentId(), 456, 'segmentId is extracted from segment page with hash info in url');
});
