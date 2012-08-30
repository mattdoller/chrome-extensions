TODO
====

* Add functionality to display other riders that might have been on the road with you for a given ride that day.
    - For a given ride, query the segments in the ride
    - For each segment, lookup the efforts on that day:
    - http://app.strava.com/api/v1/segments/<effort_id>/efforts?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
* Create a single class responsible for querying the API, something like "StravaApi".  This class should be able to do things like "StravaApi.getRide(id)"
* Implement some tests using phantom.js
* use something like Mockjax (https://github.com/appendto/jquery-mockjax/) for testing the ajax requests
* Hook up the project to travis-ci 