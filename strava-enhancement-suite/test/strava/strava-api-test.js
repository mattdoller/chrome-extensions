test('StravaApi tests', function() {

	/*
		Note: the StravaApi class is responsible for the heavy lifting
		of communicating with the strava api web app.  Right now, it's
		difficult to test, as it directly communicates w/ the app through
		$.ajax calls.  It would be nice to do some mocking with something
		like jquery-mockjax, but that only supports stubbing, and not
		verification - that is, I can stub out fake responses from a 
		$.ajax call with mockjax, but I can't assert that, say, 
		stravaApi.findRide(123) hits the correct Url.
		
		For now, this class just has a single test which doesn't do anything.
		
		Note: I could acutally use real rides/efforts/athletes from the
		production strava api app to do testing, but I don't want to do
		that yet, as they could change, and it's not great for testing 
		without a web connection.
	*/
	assert.equal(1, 1);
});
