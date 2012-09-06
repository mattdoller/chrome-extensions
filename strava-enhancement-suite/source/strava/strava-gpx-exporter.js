var StravaGpxExporter = function(rideId, strava) {
	this._rideId = rideId;
	this._strava = strava;
};

(function() {

	// private methods
	function xmlEncode(s) {
		return s
			? s.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")
			: '';
	}

	// public methods
	this.toGpx = function() {
		var template = 
			'<gpx '
			+ 'xmlns="http://www.topografix.com/GPX/1/0" ' 
			+ 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
			+ 'xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd" '
			+ 'creator="GPX/TCX exporter for Chrome" '
			+ 'version="1.0"> '
	
			+ '<trk>'
				+ '<name>{{name}}</name>'
				+ '<trkseg>'
					+ '{{#trkpts}}'
					+ '<trkpt lat="{{lat}}" lon="{{lon}}">'
					+ '<ele>{{ele}}</ele>'
					+ '</trkpt>'
					+ '{{/trkpts}}'
				+ '<trkseg>'
			+ '</trk>'
		+ '</gpx>';

		var ride = this.getRide();

		return {
			name: ride.name,
			xml: Mustache.to_html(template, ride)
		};
	};

	this.getRide = function() {
		var rideJson = this._strava.findRide(this._rideId);

		var streams = ['latlng', 'distance', 'altitude'];
		var streamsJson = this._strava.findRideStreams(this._rideId, streams);

		var ride = {
			name: xmlEncode(rideJson.ride.name),
			distance: rideJson.ride.distance,
			location: rideJson.ride.location,
			description: rideJson.ride.description,
			trkpts: []
		};

		for (var i = 0; i < streamsJson.latlng.length; i++) {
			var latlng = streamsJson.latlng[i];
			var ele = streamsJson.altitude[i];
			
			ride.trkpts.push({
				lat: latlng[0],
				lon: latlng[1],
				ele: ele
			});
		}

		return ride;
	};

}).call(StravaGpxExporter.prototype);