test('StravaContext tests', function() {

	var context = new StravaContext('http://app.strava.com/rides/123');
	assert.equal(context.rideId(), 123);

	context = new StravaContext('http://app.strava.com/activities/1234');
	assert.equal(context.rideId(), 1234);
	
	context = new StravaContext('http://app.strava.com/segments/456');
	assert.equal(context.segmentId(), 456);

	context = new StravaContext('http://app.strava.com/athletes/789');
	assert.equal(context.athleteId(), 789);
	
	// try some cases with a hash
	context = new StravaContext('http://app.strava.com/rides/123#456');
	assert.equal(context.rideId(), 123);

	context = new StravaContext('http://app.strava.com/segments/456#def');
	assert.equal(context.segmentId(), 456);
});
