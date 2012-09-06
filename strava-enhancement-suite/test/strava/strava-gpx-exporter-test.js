test('StravaGpxExporter tests', function() {

	JsMockito.Integration.importTo(window);

	var strava = mock(StravaApi);

	// we should find a ride by id 123
	when(strava).findRide(123).thenReturn({
		'ride': {
			'id': 123,
			'name': 'my ride',
			'distance': 10000,
			'location': 'Boston, MA',
			'description': 'test description'	
		}
	});

	// we should find the segments for ride 123
	when(strava).findRideStreams(123).thenReturn({
		'altitude' : [ 1, 2, 3, 4 ],
		'distance' : [ 5, 6, 7, 8 ],
		'latlng' : [ [0,0], [1,2], [3,4], [5,6] ]
	})

	// create the exporter with the mock api
	var exporter = new StravaGpxExporter(123, strava);
	var gpx = exporter.toGpx();

	var expectedXml = 
		'<gpx '
		+ 'xmlns="http://www.topografix.com/GPX/1/0" ' 
		+ 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
		+ 'xsi:schemaLocation="http://www.topografix.com/GPX/1/0 '
		+ 'http://www.topografix.com/GPX/1/0/gpx.xsd" '
		+ 'creator="GPX/TCX exporter for Chrome" '
		+ 'version="1.0"> '
		+ 	'<trk>'
		+ 		'<name>my ride</name>'
		+ 		'<trkseg>'
		+ 			'<trkpt lat="0" lon="0">'
		+ 				'<ele>1</ele>'
		+ 			'</trkpt>'
		+ 			'<trkpt lat="1" lon="2">'
		+ 				'<ele>2</ele>'
		+ 			'</trkpt>'
		+ 			'<trkpt lat="3" lon="4">'
		+ 				'<ele>3</ele>'
		+ 			'</trkpt>'
		+ 			'<trkpt lat="5" lon="6">'
		+ 				'<ele>4</ele>'
		+ 			'</trkpt>'
		+ 		'<trkseg>'
		+ 	'</trk>'
		+ '</gpx>';

	equal('my ride', gpx.name, 'file name is set to ride name');
	equal(expectedXml, gpx.xml, 'xml is built correctly');
});
