import React, { Component, PropTypes } from 'react';
import { List as VirtualScroll } from 'react-virtualized';
import classNames from 'classnames';
import moment from 'moment';
import { getMonth, getWeeksInMonth, validParsedDate } from '../utils';
import Month from '../Month';
var style = {
	'root': 'Cal__List__root',
	'scrolling': 'Cal__List__scrolling'
};

var List = function (_Component) {
	babelHelpers.inherits(List, _Component);

	function List() {
		var _ref;

		var _temp, _this, _ret;

		babelHelpers.classCallCheck(this, List);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_ref = List.__proto__ || Object.getPrototypeOf(List)).call.apply(_ref, [this].concat(args))), _this), _this.cache = {}, _this.state = {}, _this.memoize = function (param) {
			if (!this.cache[param]) {
				var result = getMonth(param); //custom function
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
				var weeks = getWeeksInMonth(date, locale);
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

			return React.createElement(Month, {
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
		}, _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
	}

	babelHelpers.createClass(List, [{
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
			    width = _props.width,
			    style = _props.style;

			if (!this._initScrollTop) this._initScrollTop = this.getDateOffset(selectedDate && selectedDate.date || today.date);
			if (typeof width == 'string' && width.indexOf('%') !== -1) {
				width = window.innerWidth * parseInt(width.replace('%', ''), 10) / 100; // See https://github.com/bvaughn/react-virtualized/issues/229
			}

			var containerStyle = babelHelpers.extends({}, this.props.style, { lineHeight: rowHeight + 'px' });

			return React.createElement(VirtualScroll, {
				ref: 'VirtualScroll',
				width: width,
				height: height,
				rowCount: months.length,
				rowHeight: this.getMonthHeight,
				estimatedRowSize: rowHeight * 5,
				rowRenderer: this.renderMonth,
				onScroll: onScroll,
				scrollTop: this._initScrollTop,
				className: classNames(style.root, babelHelpers.defineProperty({}, style.scrolling, isScrolling)),
				style: containerStyle,
				overscanRowCount: overscanMonthCount
			});
		}
	}]);
	return List;
}(Component);

List.propTypes = {
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	height: PropTypes.number,
	style: PropTypes.object,
	rowHeight: PropTypes.number,
	selectedDate: PropTypes.object,
	disabledDates: PropTypes.arrayOf(PropTypes.string),
	disabledDays: PropTypes.arrayOf(PropTypes.number),
	months: PropTypes.arrayOf(PropTypes.object),
	onDaySelect: PropTypes.func,
	onScroll: PropTypes.func,
	overscanMonthCount: PropTypes.number,
	isScrolling: PropTypes.bool,
	today: validParsedDate,
	min: validParsedDate,
	minDate: validParsedDate,
	maxDate: validParsedDate,
	showOverlay: PropTypes.bool,
	theme: PropTypes.object,
	locale: PropTypes.object
};
export default List;