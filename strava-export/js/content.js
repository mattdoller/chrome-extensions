$(document).ready(function() {
	
	if ($('#activity-actions').length != 0) {
		console.log('We already have an activity actions collection on this page.  We must be on one of our own rides.  Skipping...');
		return;
	}
	
	var formAction = 'http://cosmocatalano.com/strava/export/export_start.php';
	
	var actions = $('#sidebar-summary section.actions div.right');
	var dropdown = $('<div class="drop-down-menu enabled" id="activity-actions" />').appendTo(actions);
	var selection = $('<div class="selection">Actions</div>').appendTo(dropdown);
	var options = $('<ul class="options" style="display: none;" />').appendTo(dropdown);
	
		var gpx = 
		$('<li>' 
			+ '<a class="export-from-strava" data-ridetype="GPX">Export GPX</a>' 
			+ '<form method="POST" action="' + formAction + '" target="_blank">'
				+ '<input type="hidden" name="rideurl" value="' + document.URL + '" />'
				+ '<input type="hidden" name="ridetype" value="GPX" />'
			+ '</form>'
		+ '</li>'
	).appendTo(options);

	var tcx = 
		$('<li>' 
			+ '<a class="export-from-strava" data-ridetype="TCX">Export TCX</a>' 
			+ '<form method="POST" action="' + formAction + '" target="_blank">'
				+ '<input type="hidden" name="rideurl" value="' + document.URL + '" />'
				+ '<input type="hidden" name="ridetype" value="TCX" />'
			+ '</form>'
		+ '</li>'
	).appendTo(options);
		
	$('a.export-from-strava').click(function() {
		var form = $(this).next('form');
		$(form).submit();
	});
})