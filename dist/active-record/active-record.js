'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _angularCakephp = require('../angular-cakephp');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MESSAGE_DELETE_ERROR_NO_ID = 'Can not delete record with no ID';
var MESSAGE_VIEW_ERROR_NO_ID = 'Can not view record with no ID';

/**
 * Class ActiveRecord
 */

var ActiveRecord = function () {

    /**
     * @constructor
     * @param  {Object} data  = {}
     * @param  {Class Instance} model = null
     * @param  {Boolean} map_data = true
     */
    function ActiveRecord() {
        var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var model = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        var map_data = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

        _classCallCheck(this, ActiveRecord);

        this.model = !_lodash2.default.isNull(model) ? model : _angularCakephp.BaseModel;
        this.mapData = !_lodash2.default.isNull(map_data) ? map_data : true;

        // map data
        if (this.mapData) {
            for (var prop in data) {
                this[prop] = data[prop];
            }
        }
    }

    /**
     * mapData
     * Whether or not to atomatically map provided data to class properties
     */


    _createClass(ActiveRecord, [{
        key: 'getClassName',


        /**
         * getClassName
         */
        value: function getClassName() {
            // get Active Record class name from Class.constructor.name if it's not 'Function', otherwise  get from Class.name
            return this.constructor.name !== 'Function' ? this.constructor.name : !_lodash2.default.isUndefined(this.name) ? this.name : null;
        }

        //-----------------------
        // methods
        //-----------------------

        /**
         * view
         * @param  {Object} config = {}
         * @return {Promise}
         */

    }, {
        key: 'view',
        value: function view() {
            var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


            // view (no id)
            if (!_lodash2.default.has(this, 'id') || _lodash2.default.isUndefined(this.id)) {
                throw new Error(MESSAGE_VIEW_ERROR_NO_ID);
            }

            // edit
            return this.model.view(this.constructor, this.id, config);
        }

        /**
         * save
         * runs RestApi save or edit depending on whether anid is set
         *
         * @param  {Object} config = {}
         * @return {Promise}
         */

    }, {
        key: 'save',
        value: function save() {
            var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


            // add (no id)
            if (!_lodash2.default.has(this, 'id') || _lodash2.default.isUndefined(this.id)) {
                return this.model.add(this.constructor, this, config);
            }

            // edit
            return this.model.edit(this.constructor, this.id, this, config);
        }

        /**
         * delete
         *
         * @param  {Object} config = {}
         * @return {Promise}
         */

    }, {
        key: 'delete',
        value: function _delete() {
            var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


            // no id
            if (!_lodash2.default.has(this, 'id') || _lodash2.default.isUndefined(this.id)) {
                throw new Error(MESSAGE_DELETE_ERROR_NO_ID);
            }

            // delete
            return this.model.delete(this.constructor, this.id, config);
        }
    }, {
        key: 'clone',
        value: function clone() {
            return new this.constructor(this, this.model, this.mapData);
        }
    }, {
        key: 'mapData',
        get: function get() {
            return this._map_data;
        },
        set: function set(value) {
            this._map_data = value;
        }

        /**
         * model
         */

    }, {
        key: 'model',
        get: function get() {
            return this._model;
        },
        set: function set(value) {
            this._model = value;
        }
    }]);

    return ActiveRecord;
}();

// constants


exports.default = ActiveRecord;
ActiveRecord.MESSAGE_DELETE_ERROR_NO_ID = MESSAGE_DELETE_ERROR_NO_ID;
ActiveRecord.MESSAGE_VIEW_ERROR_NO_ID = MESSAGE_VIEW_ERROR_NO_ID;