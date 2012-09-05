test('Strava Urls tests', function() {

	var url = StravaUrls.rideUrl(123);
	assert.equal(url, 'http://app.strava.com/rides/123');

	url = StravaUrls.athleteUrl(123);
	assert.equal(url, 'http://app.strava.com/athletes/123');
	
	url = StravaUrls.dashboardUrl();
	assert.equal(url, 'http://app.strava.com/dashboard');
	
	url = StravaUrls.segmentUrl(456);
	assert.equal(url, 'http://app.strava.com/segments/456');
	
	url = StravaUrls.effortUrl(1234, 5678);
	assert.equal(url, 'http://app.strava.com/rides/1234#5678');
});