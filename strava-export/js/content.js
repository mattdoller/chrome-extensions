$(document).ready(function() {
	
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

		var id = window.location + '';
		var rideId = id.substr(id.lastIndexOf('/') + 1, 1000);

		var stravaRide = new StravaRide(rideId);
		var gpx = stravaRide.toGpx();

		var blob = new Blob([gpx.xml], { type: 'application/xml+gpx' });
		saveAs(blob, gpx.name + '.gpx');
	});
})