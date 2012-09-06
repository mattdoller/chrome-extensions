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

	var oldAjax = $.ajax;
	var complete = function (xhr, status) {};
	var success = function (data, status, xhr) {};
	var error = function (xhr, status, errorThrown) {};
	var callbacks = {
		complete: complete,
		success: success,
		error: error
	};

	var data = {};

	// login
	// setup our mock ajax instance
	$.ajax = function (params) {
		equal(params.type, 'POST', 'login request type is POST');
		equal(params.url, 'https://app.strava.com/api/v2/authentication/login', 'login url is correct');
		equal(params.data.email, 'user@example.com', 'login username is correct');
		equal(params.data.password, 'password', 'login password is correct');
		equal(params.complete, complete, 'login complete callback is correct');
		equal(params.success, success, 'login success callback is correct');
		equal(params.error, error, 'login error callback is correct');
	};
	
	var strava = new StravaApi();
	strava.login('user@example.com', 'password', callbacks);

	// find athlete
	$.ajax = function (params) {
		equal(params.type, 'GET', 'findAthlete request type is GET');
		equal(params.url, 'http://app.strava.com/api/v2/athletes/123', 'findAthlete url is correct');
		equal(params.data.token, 'abcdefg', 'findAthlete token is correct');
		equal(params.complete, complete, 'findAthlete complete callback is correct');
		equal(params.success, success, 'findAthlete success callback is correct');
		equal(params.error, error, 'findAthlete error callback is correct');	
	};

	strava.findAthlete(123, 'abcdefg', callbacks);

	// find effort
	$.ajax = function (params) {
		equal(params.type, 'GET', 'findEffort request type is GET');
		equal(params.url, 'http://app.strava.com/api/v1/efforts/456', 'findEffort url is correct');
		equal(params.complete, complete, 'findEffort complete callback is correct');
		equal(params.success, success, 'findEffort success callback is correct');
		equal(params.error, error, 'findEffort error callback is correct');	
	};

	strava.findEffort(456, callbacks);

	// find ride
	$.ajax = function (params) {
		equal(params.type, 'GET', 'findRide request type is correct');
		equal(params.url, 'http://app.strava.com/api/v1/rides/789', 'findRide url is correct');
		equal(params.complete, complete, 'findRide complete callback is correct');
		equal(params.success, success, 'findRide success callback is correct');
		equal(params.error, error, 'findRide error callback is correct');
	};

	strava.findRide(789, callbacks);

	// find ride efforts
	$.ajax = function (params) {
		equal(params.type, 'GET', 'findRideEfforts request type is GET');
		equal(params.url, 'http://app.strava.com/api/v2/rides/123/efforts', 'findRideEfforts url is correct');
		equal(params.complete, complete, 'findRideEfforts complete callback is correct');
		equal(params.success, success, 'findRideEfforts success callback is correct');
		equal(params.error, error, 'findRideEfforts error callback is correct');	
	};

	strava.findRideEfforts(123, callbacks);

	// find ride streams
	$.ajax = function (params) {
		equal(params.type, 'GET', 'findRideStreams request type is GET');
		equal(params.url, 'http://app.strava.com/api/v1/streams/456', 'findRideStreams url is correct');
		equal(params.data['streams[]'], 'a,b,c,d', 'findRideStreams correctly concatenates stream names');
		equal(params.complete, complete, 'findRideStreams complete callback is correct');
		equal(params.success, success, 'findRideStreams success callback is correct');
		equal(params.error, error, 'findRideStreams error callback is correct');	
	};

	strava.findRideStreams(456, ['a', 'b', 'c', 'd'], callbacks);

	// find segment
	$.ajax = function (params) {
		equal(params.type, 'GET', 'findSegemnt request type is GET');
		equal(params.url, 'http://app.strava.com/api/v1/segments/789', 'findSegment url is correct');
		equal(params.complete, complete, 'findSegment complete callback is correct');
		equal(params.success, success, 'findSegment success callback is correct');
		equal(params.error, error, 'findSegment error callback is correct');	
	};

	strava.findSegment(789, callbacks);

	data = {
		clubId: 123,
		athleteId: 456,
		atleteName: 'Homer Simpson',
		startDate: '2012-01-01',
		endDate: '2012-12-31',
		best: true
	};

	// find segment efforts
	$.ajax = function (params) {
		equal(params.type, 'GET', 'findSegmentEfforts request type is GET');
		equal(params.url, 'http://app.strava.com/api/v1/segments/123/efforts', 'findSegmentEfforts url is correct');
		equal(params.data, data, 'findSegmentEfforts data parameters are correct'), 
		equal(params.complete, complete, 'findSegmentEfforts complete callback is correct');
		equal(params.success, success, 'findSegmentEfforts success callback is correct');
		equal(params.error, error, 'findSegmentEfforts error callback is correct');	
	};

	strava.findSegmentEfforts(123, data, callbacks);

	// reset the ajax call - this shouldnt even be necessary, but just in case
	$.ajax = oldAjax;
});
