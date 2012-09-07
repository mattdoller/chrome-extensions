$(document).ready(function() {
	
	// add ride export
	addGpxExportButton();
	
	function addGpxExportButton() {

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
	};

});
