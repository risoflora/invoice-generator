import { FunctionComponent } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import './DatePicker.scss';

type Props = {
  dateFormat?: string;
  placeholder?: string;
};

const DatePicker: FunctionComponent<Props & ReactDatePickerProps> = ({
  className,
  dateFormat,
  placeholder,
  ...props
}) => {
  const currentDate = new Date();

  const getFilterDate = (date: Date) => ![0, 6].includes(date.getDay());

  const getDayClassName = (date: Date) => {
    if (date.getDate() === currentDate.getDate()) {
      return 'bg-success bg-opacity-50';
    }
    if (date.getDate() === props.selected?.getDate()) {
      return 'bg-success bg-opacity-75';
    }
    return '';
  };

  const isLessThanToday = () => !!props.minDate && props.minDate?.getTime() > currentDate.getTime();

  return (
    <ReactDatePicker
      todayButton={
        <button
          type="button"
          className="date-picker-today-btn btn btn-success opacity-75 btn-sm"
          disabled={isLessThanToday()}
        >
          Today
        </button>
      }
      isClearable
      className={`form-control form-control-sm${className ? ` ${className}` : ''}`}
      clearButtonClassName="date-picker-clear-btn opacity-75"
      dayClassName={getDayClassName}
      popperClassName="pb-2 px-2"
      popperPlacement="auto"
      filterDate={getFilterDate}
      dateFormat={dateFormat}
      placeholderText={placeholder}
      {...props}
    />
  );
};

export default DatePicker;
