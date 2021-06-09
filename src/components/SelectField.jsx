import { useEffect, useState } from 'react';
import warningicon from '../assets/icons/icon-warning.svg';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiFormControl: {
      root: {
        minWidth: '250px',
        border: '1px solid #919191',
      },
      marginNormal: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
    MuiInput: {
      underline: {
        '&::before': {
          borderBottom: 0,
        },
      },
    },
    MuiInputLabel: {
      formControl: {
        transform: 'translate(0, 17px) scale(1)',
        left: '15px',
        textTransform: 'Capitalize',
      },
      shrink: {
        transform: 'translate(0, 7.5px) scale(0.75)',
      },
    },
    MuiInputBase: {
      input: {
        padding: '6px 15px !important',
      },
    },
  },
});

const SelectField = ({
  name,
  label,
  options,
  onChangeHandler,
  stateobject,
  setter,
  validation,
  warningmsg,
  initvalue,
}) => {
  const [value, setvalue] = useState({ shortName: '' });

  const changeHandler = (_, value) => {
    setvalue(value);
    const newstate = { ...stateobject, value: value?.iata || null };
    setter(newstate);
    if (onChangeHandler) onChangeHandler(newstate);
  };

  useEffect(() => {
    setvalue({ shortName: '' });
  }, [options]);

  return (
    <div className="input-component">
      <Autocomplete
        options={options}
        value={value}
        getOptionLabel={(option) => option.shortName || ''}
        id={name}
        includeInputInList
        onChange={changeHandler}
        renderInput={(params) => (
          <ThemeProvider theme={theme}>
            <TextField
              {...params}
              autoComplete="off"
              label={label}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
            />
          </ThemeProvider>
        )}
      />
      {validation === false && stateobject.required ? (
        <div className="input-warning">
          <img className="input-warnicon" src={warningicon} alt="warning icon" />
          <span>{warningmsg}</span>
        </div>
      ) : null}
    </div>
  );
};

export default SelectField;
