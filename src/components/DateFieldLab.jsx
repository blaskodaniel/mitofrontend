import dayjs from 'dayjs';
import { forwardRef, useState } from 'react';
import warningicon from '../assets/icons/icon-warning.svg';
import DateFnsUtils from '@date-io/dayjs';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DesktopDatePicker from '@material-ui/lab/DatePicker';

const DateFieldLab = ({ name, label, placeholder, onChangeHandler, isrequired, icon, warningmsg }) => {
  const [valid, setvalid] = useState(true);
  const [selectdate, setselectdate] = useState(null);

  return (
    <div className="input-component">
      <div className="input-wrapper">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="YYYY/MM/DD"
            margin="normal"
            id={name}
            label={placeholder}
            value={selectdate}
            onChange={setselectdate}
            keyboardIcon={<img className="input-icon" src={icon} alt="input icon" />}
          />
        </MuiPickersUtilsProvider>
      </div>
      {!valid && (
        <div className="input-warning">
          <img className="input-warnicon" src={warningicon} alt="warning icon" />
          <span>{warningmsg}</span>
        </div>
      )}
    </div>
  );
};

export default DateFieldLab;
