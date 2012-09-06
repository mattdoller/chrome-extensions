test('Strava Urls tests', function() {

	var url = StravaUrls.rideUrl(123);
	equal(url, 'http://app.strava.com/rides/123', 'ride url is created from rideId');

	url = StravaUrls.athleteUrl(123);
	equal(url, 'http://app.strava.com/athletes/123', 'athlete url is created from athleteId');
	
	url = StravaUrls.dashboardUrl();
	equal(url, 'http://app.strava.com/dashboard', 'dashboard url is created');
	
	url = StravaUrls.segmentUrl(456);
	equal(url, 'http://app.strava.com/segments/456', 'segment url is created');
	
	url = StravaUrls.effortUrl(1234, 5678);
	equal(url, 'http://app.strava.com/rides/1234#5678', 'effort url is created from ride and segment ids');
});
