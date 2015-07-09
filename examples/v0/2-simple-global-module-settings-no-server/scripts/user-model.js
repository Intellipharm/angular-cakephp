'use strict';

(function () {

    //---------------------------------------------------
    // User Model
    //---------------------------------------------------

    var UserModel = function (BaseModel) {

        /**
         * UserModel
         * @extends BaseModel
         *
         * @constructor
         */
        function UserModel() {
            this.config = {}
        }

        /**
         * User
         *
         * @param data
         * @constructor
         */
        function User(data) {
            this.name = data.name;
        }

        return BaseModel.extend(UserModel, User);
    };

    UserModel.$inject = ['AngularCakePHPBaseModel'];

    angular.module('App').factory('UserModel', UserModel);
})();