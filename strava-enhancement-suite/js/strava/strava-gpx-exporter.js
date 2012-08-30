var StravaGpxExporter = Class.$extend({
	__init__ : function(rideId) {
		this.id = rideId;
	},

	toGpx : function() {
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
	},
	
	toTcx : function() {
		throw "toTcx not implemented."
	},

	getRide : function() {

		var instance = this;
	
		var ride = {};
		ride.trkpts = [];

		var rideApi = 'http://app.strava.com/api/v1/rides/' + this.id;
		$.ajax({
			url: rideApi,
			async: false,
			success: function(response) {
				// get some generate info about the ride
				ride.name = instance.xmlEncode(response.ride.name),
				ride.distance = response.ride.distance,
				ride.location = response.ride.location,
				ride.description = response.ride.description
			}
		});

		var streamsApi = 'http://app.strava.com/api/v1/streams/' + this.id + '?streams[]=latlng,distance,altitude';
		$.ajax({
			url: streamsApi,
			async: false,
			success: function(response) {
				for (var i = 0; i < response.latlng.length; i++) {
					var latlng = response.latlng[i];
					var ele = response.altitude[i];
					
					ride.trkpts.push({
						lat: latlng[0],
						lon: latlng[1],
						ele: ele
					});
				}
			}
		});

		return ride;
	},
	
	xmlEncode : function(s) {
		return s
			? s.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")
			: '';
	}

});
