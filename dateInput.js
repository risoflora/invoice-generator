import './third-party/datepicker-full.min.js';

class DateInput extends Datepicker {
  constructor(element, options) {
    const opts = {
      ...options,
      autohide: true,
      buttonClass: 'btn',
      clearBtn: true,
      daysOfWeekDisabled: [0, 6],
      todayBtn: true,
      todayBtnMode: 1
    };
    super(element, opts);
  }
}

export { DateInput };
