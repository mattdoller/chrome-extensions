$(document).ready(function() {
	
	var context = new StravaContext(window.location);
	var rideId = context.rideId();

	// add ride export
	addGpxExportButton(rideId);
	
	// add other riders also on this ride
	addOtherRiders(rideId);

	function addGpxExportButton(rideId) {
	
		if ($('#activity-actions').length != 0) {
			console.log('We already have an activity actions collection on this page.  We must be on one of our own rides.  Skipping...');
			return;
		}
	
		var actions = $('#sidebar-summary section.actions div.right');
		var dropdown = $('<div class="drop-down-menu enabled" id="activity-actions" />').appendTo(actions);
		var selection = $('<div class="selection">Actions</div>').appendTo(dropdown);
		var options = $('<ul class="options" style="display: none;" />').appendTo(dropdown);
		var gpx = $('<li><a class="export-from-strava" data-ridetype="GPX">Export GPX</a></li>').appendTo(options);
		
		$('a.export-from-strava').click(function() {
			var exporter = new StravaGpxExporter(rideId);
			var gpx = exporter.toGpx();
		
			var blob = new Blob([gpx.xml], { type: 'application/xml+gpx' });
			saveAs(blob, gpx.name + '.gpx');
		});	
	}

	function addOtherRiders(rideId) {
		
		var strava = new StravaApi();

		// load up the ride
		var ride;
		strava.findRide(rideId, {
			success: function(response) {
				ride = response.ride;
			}
		});

		// find the ride efforts on this ride
		strava.findRideEfforts(rideId, {
			success: function(response) {

				var efforts = response.efforts;

				$.each(efforts, function(idx, effort) {
					var segment = effort.segment;
					loadSegment(segment, ride);
				});

			}
		});


		// for each segment effort, get the athlete on the effort itself

		// take the id of the athlete, and generate a link to the athlete page

		// add the link to the efforts table

	}

	function loadSegment(segment, ride) {
		// look up segment efforts started on or after the ride
		// date - 1, and completed before or after the end date
		var strava = new StravaApi();
		
		// startDate is a date formatted as YYYY-MM-DDTHH:MM:SSZ
		
		// remove the trailing 'Z' from the string
		var trimmed = ride.startDate.slice(0, ride.startDate.length - 1);
		var startDate = Date.parse(trimmed);
		var endDate = startDate.clone().add(1).days();

		var data = {
			startDate: startDate.toString('yyyy-MM-dd'),
			endDate: endDate.toString('yyyy-MM-dd')
		};

		strava.findSegmentEfforts(segment.id, data, {
			success: function(response) {
				var efforts = response.efforts;
				$.each(efforts, function(idx, effort) {
					loadEffort(effort);
				});
			}
		});
	}
	
	function loadEffort(effort) {
		var athlete = effort.athlete;
		var url = StravaUrls.athleteUrl(athlete.id);
		var name = athlete.name;
		console.log('name: {0}, url: {1}'.format([name, url]));
	}

});
