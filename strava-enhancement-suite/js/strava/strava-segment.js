var StravaSegment = Class.$extend({
	__init__ : function(segmentId) {
		this.id = segmentId;
		this.api = 'http://app.strava.com/api/v1/segments';
	},

	getEfforts() : function(criteria) {
		// criteria could be an object with parameters to pass to
		// the api, such as:
		/*
			criteria = {
				startDate: '2012-07-04',
				endDate: '2012-07-05'
			}
		*/
	},


});
