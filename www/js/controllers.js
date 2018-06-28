var app = angular.module('tedrssapp.controllers', []);

app.controller('FeedCtrl', function ($scope, $ionicLoading, FeedService) {
	console.log("Loading FeedCtrl");

	 $ionicLoading.show({template:'Loading feed...'});
	$scope.feed = FeedService;
	$scope.feed.loadFeed().then(function(){

		$ionicLoading.hide();
	});

	$scope.doRefresh = function () {
		$scope.feed.loadFeed().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
});

app.controller('PostCtrl', function ($scope, $stateParams, FeedService, $window) {
	console.log("Loading PostCtrl");
	$scope.postId = $stateParams.id;
	$scope.post = FeedService.getEntry($scope.postId);
//social sharing plugins
	$scope.share = function ($cordovaSocialSharing) {
		console.debug("Sharing post");
		$cordovaSocialSharing
			.share($scope.post.contentSnippet, $scope.post.title, $scope.post.thumbnail, $scope.post.link) // Share via native share sheet
			.then(function(result) {
				// Success!
			}, function(err) {
				// An error occured. Show a message to the user
			});
	};
//Open new Browser Window
	$scope.readMore = function () {
		console.debug("Read more post");
		$window.open($scope.post.link, "system", "location=yes");
	};

});
