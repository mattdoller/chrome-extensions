$(document).ready(function() {
	
	// add ride export
	
	// add 
	
	var context = new StravaContext(window.location);
	var rideId = context.rideId();
	
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
	
	var strava = new StravaApi();
	var ride = strava.findRide(rideId);
	var rideDate = ride.ride.startDate;
	
	var athleteId = ride.ride.athlete.id;
	
	var dateRegex = /(\d{4})-(\d{2})-(\d{2})/;
	var matches = rideDate.match(dateRegex);
	
	var y = matches[1];
	var m = matches[2] - 1;
	var d = matches[3];
	
	var startDate = new Date(y, m, d);
	var endDate = new Date();
	endDate.setDate(startDate.getDate() + 1);
	
	// find the segments table and add in other riders that did this segment on this day
	var effortsTable = $('#segment-efforts-table table.segments');
	var segments = $(effortsTable).find('tr.segment a.segment');
	
	var rideEfforts = strava.findRideEfforts(rideId);
	
	$.each(segments, function(idx, segment) {
		var href = $(segment).attr('href');
		var regex = /#(\d+)/;
		var effortId = href.match(regex)[1];

		var segmentId;
		for (var i in rideEfforts.efforts) {
			var effort = rideEfforts.efforts[i];
			
			if (effort.effort.id == effortId) {
				segmentId = effort.segment.id;
				break;
			}
		}
		
		var segmentEfforts = strava.findSegmentEfforts(segmentId, {
			'startDate': startDate.toString('yyyy-MM-dd'),
			'endDate': endDate.toString('yyyy-MM-dd')
		});
		
		var athleteCount = 0;
		var html = '<br /><span style="font-size: x-small">...also ridden on ' + startDate.toString('MM/dd') + ' by: ';
		var append = '';
		for (var i in segmentEfforts.efforts) {
			if (segmentEfforts.efforts[i].athlete.id == athleteId) {
				continue;
			}
			html += (append + segmentEfforts.efforts[i].athlete.name);
			append = ', ';
			athleteCount++;
		}
		html += '</span>';
		
		if (athleteCount == 0) {
			return;
		}
		
		$(segment).after(html);
	});
	
	var formatDate = function(data) {
		
	}
	
});