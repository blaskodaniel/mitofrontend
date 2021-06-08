import { useCallback, useEffect, useState } from 'react';
import calendaricon from '../assets/icons/icon-calendar.svg';
import warningicon from '../assets/icons/icon-warning.svg';
import DateField from '../components/DateField';
import SelectField from '../components/SelectField';
import { GetAllStation } from '../adapters/requests';
import dayjs from 'dayjs';
import { useHistory } from 'react-router';
import { useResetRecoilState } from 'recoil';
import { cart } from '../state/atoms';

const HomePage = () => {
  const history = useHistory();
  const resetcart = useResetRecoilState(cart);
  const [stations, setstations] = useState([]);
  const [dateError, setdateError] = useState(null);
  const [destinationStations, setdestinationStations] = useState([]);
  const [originfieldIsValid, setoriginfieldIsValid] = useState(null);
  const [destinationfieldIsValid, setdestinationfieldIsValid] = useState(null);
  const [departurefieldIsValid, setdeparturefieldIsValid] = useState(null);
  const [returnfieldIsValid, setreturnfieldIsValid] = useState(null);
  const [originfield, setoriginfield] = useState({
    value: '',
    name: 'origin',
    required: true,
  });
  const [destinationfield, setdestinationfield] = useState({
    value: '',
    name: 'destination',
    required: true,
  });
  const [departurefield, setdeparturefield] = useState({ value: '', name: 'departure', required: true });
  const [returnfield, setreturnfield] = useState({ value: '', name: 'return', required: false });

  const filterDestination = useCallback(() => {
    if (originfield.value) {
      const originStation = stations.find((x) => x.iata === originfield.value);
      const connectionsIATA = originStation?.connections?.map((x) => x.iata);
      const validDestionations = stations.filter((x) => connectionsIATA?.includes(x.iata));
      setdestinationStations(validDestionations);
    }
  }, [originfield, stations]);

  const validation = (field, setvalidation) => {
    let isValid = false;
    // Required
    if (field.required === true && (!field.value || field.value === 'Invalid Date')) {
      isValid = false;
    } else {
      isValid = true;
    }
    setvalidation(isValid);
  };

  const dateValidation = useCallback(() => {
    if (
      dayjs(departurefield.value).isAfter(returnfield.value, 'day') ||
      dayjs(departurefield.value).isBefore(new Date(), 'day')
    ) {
      console.log('Dátumok nem jók', departurefield.value);
      setdateError(true);
    } else {
      console.log('Dátumok jók', departurefield.value);
      setdateError(false);
    }
  }, [departurefield.value, returnfield.value]);

  const onSubmitHandler = () => {
    // Validation
    if (originfieldIsValid && destinationfieldIsValid && departurefieldIsValid && !dateError) {
      resetcart();
      if (returnfield.value && returnfield.value !== 'Invalid Date') {
        history.push(
          `/flight?dep=${originfield.value}&arr=${destinationfield.value}&depdate=${departurefield.value}&retdate=${returnfield.value}`,
        );
      } else {
        history.push(`/flight?dep=${originfield.value}&arr=${destinationfield.value}&depdate=${departurefield.value}`);
      }
    } else {
      validation(originfield, setoriginfieldIsValid);
      validation(destinationfield, setdestinationfieldIsValid);
      validation(departurefield, setdeparturefieldIsValid);
    }
  };

  useEffect(() => {
    const getstations = async () => {
      try {
        const response = await GetAllStation();
        setstations(response.data);
        setdestinationStations(response.data);
      } catch (e) {
        console.log('Error during get stations');
      }
    };
    getstations();
  }, []);

  useEffect(() => {
    filterDestination();
  }, [filterDestination, originfield]);

  useEffect(() => {
    dateValidation();
  }, [dateValidation, departurefield, returnfield]);

  return (
    <div className="home mapbg">
      <div className="box">
        <div className="header">
          <img src={'/assets/icons/icon-plus.svg'} alt="plus icon" />
          <div>mito airline</div>
        </div>
        <div className="body">
          <div className="inputs">
            <SelectField
              name="origin"
              label="Origin"
              stateobject={originfield}
              setter={setoriginfield}
              options={stations.sort((x, y) => x.shortName - y.shortName)}
              validation={originfieldIsValid}
              onChangeHandler={(state) => validation(state, setoriginfieldIsValid)}
              warningmsg="Please select origin"
            />
            <SelectField
              name="destination"
              label="Destination"
              stateobject={destinationfield}
              setter={setdestinationfield}
              options={destinationStations.sort((x, y) => x.shortName - y.shortName)}
              validation={destinationfieldIsValid}
              onChangeHandler={(state) => validation(state, setdestinationfieldIsValid)}
              warningmsg="Please select destination"
            />
            <DateField
              name="departure"
              label="Departure"
              placeholder="Departure"
              stateobject={departurefield}
              setter={setdeparturefield}
              icon={calendaricon}
              validation={departurefieldIsValid}
              onChangeHandler={(state) => validation(state, setdeparturefieldIsValid)}
              warningmsg="Please select departure"
            />
            <DateField
              name="return"
              label="Return"
              placeholder="Return"
              stateobject={returnfield}
              setter={setreturnfield}
              icon={calendaricon}
              validation={returnfieldIsValid}
              onChangeHandler={(state) => validation(state, setreturnfieldIsValid)}
              warningmsg="Please select return"
            />
          </div>
          {dateError && (
            <div className="input-warning">
              <img className="input-warnicon" src={warningicon} alt="warning icon" />
              <span>Date(s) incorrect</span>
            </div>
          )}
          <div className="buttons">
            <button onClick={onSubmitHandler} type="button">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
