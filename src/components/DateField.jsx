import dayjs from 'dayjs';
import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import warningicon from '../assets/icons/icon-warning.svg';

const DateField = ({
  name,
  label,
  placeholder,
  onChangeHandler,
  stateobject,
  setter,
  validation,
  icon,
  warningmsg,
  mindate,
}) => {
  const [selectdate, setselectdate] = useState();

  const changeHandler = (date) => {
    setselectdate(date);
    const newstate = { ...stateobject, value: dayjs(date).format('YYYY-MM-DD') };
    setter(newstate);
    if (onChangeHandler) onChangeHandler(newstate);
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <input
        ref={ref}
        onClick={onClick}
        className="input-field"
        type="text"
        placeholder={placeholder}
        name={name}
        id={name}
        autoComplete="off"
        value={selectdate ? dayjs(selectdate).format('YYYY-MM-DD') : ''}
        onChange={(e) => changeHandler(e.target.value)}
      />
    );
  });
  return (
    <div className="input-component">
      <div className="input-wrapper">
        <DatePicker
          onChange={(date) => changeHandler(date)}
          dateFormat="YYYY-MM-DD"
          minDate={mindate || new Date()}
          customInput={<CustomInput />}
        />
        <label className="input-label" htmlFor={name}>
          {label}
        </label>
        {icon && <img className="input-icon" src={icon} alt="input icon" />}
      </div>
      {validation === false && stateobject.required ? (
        <div className="input-warning">
          <img className="input-warnicon" src={warningicon} alt="warning icon" />
          <span>{warningmsg}</span>
        </div>
      ) : null}
    </div>
  );
};

export default DateField;
