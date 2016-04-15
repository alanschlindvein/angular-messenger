/**
 * An Angular module that gives you a way to share messages among modules
 * @version v0.1.0 - 2016-04-15
 * @link https://github.com/alanschlindvein/angular-messenger
 * @author alanschlindvein <alansaraujo.schlindvein@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function (window, angular) {
angular
	.module('AngularMessenger', [])
	.provider('angularMessengerService', function() {

		var registeredCallbacks = {};

		this.$get = ['$rootScope', function($rootScope) {

			var registerCallback = function(namespace, callback) {
				if(!registeredCallbacks[namespace]) {
					registeredCallbacks[namespace] = [];
				}
				registeredCallbacks[namespace].push(callback);
			};

			var removeFromCallback = function(namespace) {
				delete registeredCallbacks[namespace]
			};

			var execCallback = function(namespace, params) {
				if(!registeredCallbacks[namespace]) {
					return;
				}
				for(var i=0; i < registeredCallbacks[namespace].length; i++) {
					registeredCallbacks[namespace][i](params);
				}
			};

			var clearAllBacks = function() {
				registeredCallbacks = {};
			};

			return {
				on: registerCallback,
				remove: removeFromCallback,
				exec: execCallback,
				clearAll: clearAllBacks
			};
		}];
	});
})(window, window.angular);