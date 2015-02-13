"use strict";

(function () {

	//-------------------------
	// App Controller
	//-------------------------

	var AppController = function ($scope, UserModel) {

		this.users = [];
		this.new_user = UserModel.new();

		// create some sample users
		this.users.push(UserModel.new({name: 'Aurelius'}));
		this.users.push(UserModel.new({name: 'Hadrian'}));
		this.users.push(UserModel.new({name: 'Claudius'}));
		this.users.push(UserModel.new({name: 'Tiberius'}));
		this.users.push(UserModel.new({name: 'Marcus Aurelius'}));

		/**
		 * createNewUser
		 */
		this.createNewUser = function() {
			console.log(this.new_user);
			this.users.push(this.new_user);
			this.new_user = UserModel.new();
			UserModel.index();
		}
	};

	AppController.$inject = ['$scope', 'UserModel'];

	angular.module('App').controller('AppController', AppController);

})();