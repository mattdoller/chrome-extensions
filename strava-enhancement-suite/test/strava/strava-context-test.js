test('Strava context tests', function() {

	var context = new StravaContext('http://app.strava.com/rides/123');
	var id = context.rideId();
	assert.equal(id, 123);

	context = new StravaContext('http://app.strava.com/segments/456');
	id = context.segmentId();
	assert.equal(id, 456);

	context = new StravaContext('http://app.strava.com/athletes/789');
	id = context.athleteId();
	assert.equal(id, 789);
});
