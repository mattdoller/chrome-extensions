var StravaContext = Class.$extend({
	__init__ : function(url) {
		this.url = url;
	},

	rideId : function() {
		// http://app.strava.com/rides/<ride_id>
		var parsed = this.parseUrl(this.url);
		
		// /rides/<ride_id>		
		var path = (parsed.path || '').toLowerCase();
		var regex = /\/rides\/(\d+)/;
		var matches = path.match(regex);
		return (matches && matches[1]) ? matches[1] : null;
	},

	segmentId : function() {
		// http://app.strava.com/segments/<segment_id>
		var parsed = this.parseUrl(this.url);

		// /segments/<segment_id>
		var path = (parsed.path || '').toLowerCase();
		var regex = /\/segments\/(\d+)/;
		var matches = path.match(regex);
		return (matches && matches[1]) ? matches[1] : null;	
	},

	effortId : function() {
	},

	athleteId : function() {
		// http://app.strava.com/athletes/<athlete_id>
		var parsed = this.parseUrl(this.url);

		// /athletes/<athlete_id>
		var path = (parsed.path || '').toLowerCase();
		var regex = /\/athletes\/(\d+)/;
		var matches = path.match(regex);
		return (matches && matches[1]) ? matches[1] : null;
	},

	parseUrl : function() {
		// parseUrl method taken from http://james.padolsey.com/javascript/parsing-urls-with-the-dom/

    var a =  document.createElement('a');
    a.href = this.url;
    return {
        source: this.url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
	}
});
