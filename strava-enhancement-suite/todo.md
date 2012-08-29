TODO
====

1. Add the GPX exporter into this extension
2. Add functionality to display other riders that might have been on the road with you for a given ride that day.
    - For a given ride, query the segments in the ride
		- For each segment, lookup the efforts on that day:
		- http://app.strava.com/api/v1/segments/<effort_id>/efforts?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD