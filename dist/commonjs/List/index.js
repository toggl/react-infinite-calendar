'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualized = require('react-virtualized');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../utils');

var _Month = require('../Month');

var _Month2 = _interopRequireDefault(_Month);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
	'root': 'Cal__List__root',
	'scrolling': 'Cal__List__scrolling'
};

var List = function (_Component) {
	_inherits(List, _Component);

	function List() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, List);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = List.__proto__ || Object.getPrototypeOf(List)).call.apply(_ref, [this].concat(args))), _this), _this.cache = {}, _this.state = {}, _this.memoize = function (param) {
			if (!this.cache[param]) {
				var result = (0, _utils.getMonth)(param); //custom function
				this.cache[param] = result;
			}
			return this.cache[param];
		}, _this.monthHeights = [], _this.getMonthHeight = function (_ref2) {
			var index = _ref2.index;

			if (!_this.monthHeights[index]) {
				var _this$props = _this.props,
				    locale = _this$props.locale,
				    months = _this$props.months,
				    rowHeight = _this$props.rowHeight;

				var date = months[index];
				var weeks = (0, _utils.getWeeksInMonth)(date, locale);
				var height = weeks * rowHeight;
				_this.monthHeights[index] = height;
			}

			return _this.monthHeights[index];
		}, _this.getMonthIndex = function (date) {
			var min = _this.props.min.date;
			var index = date.diff(min, 'months');

			return index;
		}, _this.getDateOffset = function (date) {
			var _this$props2 = _this.props,
			    min = _this$props2.min,
			    rowHeight = _this$props2.rowHeight;

			var weeks = date.clone().startOf('month').diff(min.date.clone().startOf('month'), 'weeks');

			return weeks * rowHeight;
		}, _this.getCurrentOffset = function () {
			if (_this.scrollEl) {
				return _this.scrollEl.scrollTop;
			}
		}, _this.scrollToDate = function (date) {
			var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			var offsetTop = _this.getDateOffset(date);
			_this.scrollTo(offsetTop + offset);
		}, _this.scrollTo = function () {
			var scrollTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

			if (_this.scrollEl) {
				_this.scrollEl.scrollTop = scrollTop;
			}
		}, _this.renderMonth = function (_ref3) {
			var index = _ref3.index,
			    isScrolling = _ref3.isScrolling,
			    rowStyle = _ref3.style;
			var _this$props3 = _this.props,
			    disabledDates = _this$props3.disabledDates,
			    disabledDays = _this$props3.disabledDays,
			    locale = _this$props3.locale,
			    months = _this$props3.months,
			    maxDate = _this$props3.maxDate,
			    minDate = _this$props3.minDate,
			    onDaySelect = _this$props3.onDaySelect,
			    rowHeight = _this$props3.rowHeight,
			    selectedDate = _this$props3.selectedDate,
			    showOverlay = _this$props3.showOverlay,
			    theme = _this$props3.theme,
			    today = _this$props3.today;

			var _this$memoize = _this.memoize(months[index]),
			    date = _this$memoize.date,
			    rows = _this$memoize.rows;

			return _react2.default.createElement(_Month2.default, {
				key: 'Month-' + index,
				selectedDate: selectedDate,
				displayDate: date,
				disabledDates: disabledDates,
				disabledDays: disabledDays,
				maxDate: maxDate,
				minDate: minDate,
				onDaySelect: onDaySelect,
				rows: rows,
				rowHeight: rowHeight,
				isScrolling: isScrolling,
				showOverlay: showOverlay,
				today: today,
				theme: theme,
				locale: locale,
				rowStyle: rowStyle
			});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(List, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var vs = this.refs.VirtualScroll;
			var grid = vs && vs.Grid;

			this.scrollEl = grid && grid._scrollingContainer;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    height = _props.height,
			    isScrolling = _props.isScrolling,
			    onScroll = _props.onScroll,
			    overscanMonthCount = _props.overscanMonthCount,
			    months = _props.months,
			    rowHeight = _props.rowHeight,
			    selectedDate = _props.selectedDate,
			    today = _props.today,
			    width = _props.width;

			if (!this._initScrollTop) this._initScrollTop = this.getDateOffset(selectedDate && selectedDate.date || today.date);
			if (typeof width == 'string' && width.indexOf('%') !== -1) {
				width = window.innerWidth * parseInt(width.replace('%', ''), 10) / 100; // See https://github.com/bvaughn/react-virtualized/issues/229
			}

			return _react2.default.createElement(_reactVirtualized.List, {
				ref: 'VirtualScroll',
				width: width,
				height: height,
				rowCount: months.length,
				rowHeight: this.getMonthHeight,
				estimatedRowSize: rowHeight * 5,
				rowRenderer: this.renderMonth,
				onScroll: onScroll,
				scrollTop: this._initScrollTop,
				className: (0, _classnames2.default)(style.root, _defineProperty({}, style.scrolling, isScrolling)),
				style: { lineHeight: rowHeight + 'px' },
				overscanRowCount: overscanMonthCount
			});
		}
	}]);

	return List;
}(_react.Component);

List.propTypes = {
	width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
	height: _react.PropTypes.number,
	rowHeight: _react.PropTypes.number,
	selectedDate: _react.PropTypes.object,
	disabledDates: _react.PropTypes.arrayOf(_react.PropTypes.string),
	disabledDays: _react.PropTypes.arrayOf(_react.PropTypes.number),
	months: _react.PropTypes.arrayOf(_react.PropTypes.object),
	onDaySelect: _react.PropTypes.func,
	onScroll: _react.PropTypes.func,
	overscanMonthCount: _react.PropTypes.number,
	isScrolling: _react.PropTypes.bool,
	today: _utils.validParsedDate,
	min: _utils.validParsedDate,
	minDate: _utils.validParsedDate,
	maxDate: _utils.validParsedDate,
	showOverlay: _react.PropTypes.bool,
	theme: _react.PropTypes.object,
	locale: _react.PropTypes.object
};
exports.default = List;