import React, { Component } from 'react';
import classNames from 'classnames';
import Day from '../Day';
var style = {
	'root': 'Cal__Month__root',
	'rows': 'Cal__Month__rows',
	'row': 'Cal__Month__row',
	'partial': 'Cal__Month__partial',
	'label': 'Cal__Month__label',
	'partialFirstRow': 'Cal__Month__partialFirstRow'
};

var Month = function (_Component) {
	babelHelpers.inherits(Month, _Component);

	function Month() {
		babelHelpers.classCallCheck(this, Month);
		return babelHelpers.possibleConstructorReturn(this, (Month.__proto__ || Object.getPrototypeOf(Month)).apply(this, arguments));
	}

	babelHelpers.createClass(Month, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			return !nextProps.isScrolling && !this.props.isScrolling;
		}
	}, {
		key: 'renderRows',
		value: function renderRows() {
			var _props = this.props,
			    disabledDates = _props.disabledDates,
			    disabledDays = _props.disabledDays,
			    displayDate = _props.displayDate,
			    locale = _props.locale,
			    maxDate = _props.maxDate,
			    minDate = _props.minDate,
			    onDaySelect = _props.onDaySelect,
			    rowHeight = _props.rowHeight,
			    rows = _props.rows,
			    selectedDate = _props.selectedDate,
			    today = _props.today,
			    theme = _props.theme;

			var currentYear = today.date.year();
			var monthShort = displayDate.format('MMM');
			var monthRows = [];
			var day = 0;
			var isDisabled = false;
			var isSelected = false;
			var isToday = false;
			var row = void 0,
			    date = void 0,
			    days = void 0;

			// Oh the things we do in the name of performance...
			for (var i = 0, len = rows.length; i < len; i++) {
				row = rows[i];
				days = [];

				for (var k = 0, _len = row.length; k < _len; k++) {
					date = row[k];
					day++;

					isSelected = selectedDate && date.yyyymmdd == selectedDate.yyyymmdd;
					isToday = today && date.yyyymmdd == today.yyyymmdd;
					isDisabled = minDate && date.yyyymmdd < minDate.yyyymmdd || maxDate && date.yyyymmdd > maxDate.yyyymmdd || disabledDays && disabledDays.length && disabledDays.indexOf(date.date.day()) !== -1 || disabledDates && disabledDates.length && disabledDates.indexOf(date.yyyymmdd) !== -1;

					days[k] = React.createElement(Day, {
						key: 'day-' + day,
						currentYear: currentYear,
						date: date,
						day: day,
						handleDayClick: onDaySelect,
						isDisabled: isDisabled,
						isToday: isToday,
						isSelected: isSelected,
						locale: locale,
						monthShort: monthShort,
						theme: theme
					});
				}
				monthRows[i] = React.createElement(
					'ul',
					{ className: classNames(style.row, babelHelpers.defineProperty({}, style.partial, row.length !== 7)), style: { height: rowHeight }, key: 'Row-' + i, role: 'row', 'aria-label': 'Week ' + (i + 1) },
					days
				);
			}

			return monthRows;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    displayDate = _props2.displayDate,
			    today = _props2.today,
			    rows = _props2.rows,
			    showOverlay = _props2.showOverlay,
			    rowStyle = _props2.rowStyle,
			    theme = _props2.theme;


			return React.createElement(
				'div',
				{ className: style.root, style: rowStyle },
				React.createElement(
					'div',
					{ className: style.rows },
					this.renderRows(),
					showOverlay && React.createElement(
						'label',
						{ className: classNames(style.label, babelHelpers.defineProperty({}, style.partialFirstRow, rows[0].length !== 7)), style: theme && theme.overlayColor && { backgroundColor: theme.overlayColor } },
						React.createElement(
							'span',
							null,
							'' + displayDate.format('MMMM') + (!displayDate.isSame(today.date, 'year') ? ' ' + displayDate.year() : '')
						)
					)
				)
			);
		}
	}]);
	return Month;
}(Component);

export default Month;