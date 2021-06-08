import { useState } from 'react';
import warningicon from '../assets/icons/icon-warning.svg';

const InputField = ({ name, label, placeholder, isrequired, icon, warningmsg }) => {
  const [valid, setvalid] = useState(true);
  const [value, setvalue] = useState();
  return (
    <div className="input-component">
      <div className="input-wrapper">
        <input
          className="input-field"
          type="text"
          placeholder={placeholder}
          name={name}
          onChange={(e) => setvalue(e.target.value)}
          id={name}
          required={isrequired || false}
        />
        <label className="input-label" htmlFor={name}>
          {label}
        </label>
        {icon && <img className="input-icon" src={icon} alt="input icon" />}
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

export default InputField;
