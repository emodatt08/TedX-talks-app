var app = angular.module('tedrssapp.services', []);

app.constant("FEED_URL", "http://feeds.feedburner.com/TEDTalks_video");

app.factory('FeedService', function ($http, $q, FEED_URL) {

	var self = {
		'posts': []
	};

	var parseEntry = function (entry) {
		var media = (entry && entry.mediaGroups) ? entry.mediaGroups[0].contents[0] : {url: ''};
		if (media.type == "video/mp4") {
			entry.thumbnail = media.thumbnails[0].url;
			entry.video = media.url;
		} else {
			entry.thumbnail = media.url;
		}
		entry.publishedDate = new Date(entry.publishedDate);
	};

	self.loadFeed = function () {

		self.posts.length = 0;
		var defer = $q.defer();
		var params = {"rss_url":FEED_URL};
		$http.get(" https://api.rss2json.com/v1/api.json", {params:params})
			.success(function  (res){
				console.log(res);
			angular.forEach(res.items, function (entry) {
			//parseEntry(entry);
			console.log(entry);
			self.posts.push(entry);

});
				defer.resolve(self.posts);


			});
		return defer.promise;
		// superfeedr.auth('<YOUR-SUPERFEEDER-USERNAME>', '<YOUR-SUPERFEEDER-API-TOKEN>');
		// superfeedr.setOnLoadCallback(function() {
		// 	var feed = new superfeedr.Feed(FEED_URL);
		// 	feed.load(function(result) {
		// 		$rootScope.$apply(function() {
		// 			angular.forEach(result.feed.entries, function (entry) {
		// 				self.posts.push(entry);
		// 			});
		// 			defer.resolve(self.posts);
		// 		});
		// 	});
		// });
        //
		// return defer.promise;
	};

	self.getEntry = function (link) {
		for (var i = 0; i < self.posts.length; i++) {
			var entry = self.posts[i];
			if (entry.link == link) {
				return entry;
			}
		}
		return null;
	};

	return self;
});
