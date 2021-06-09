import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import calendaricon from '../assets/icons/icon-calendar.svg';
import { addToCart } from '../state/selectors';
import DateField from './DateField';
import Loader from './Loader';

const TicketItem = ({ from, to, dep, arr, prices, type }) => {
  const addAction = useSetRecoilState(addToCart);
  const [pricesBasic] = useState(prices?.find((x) => x.bundle === 'basic'));
  const [priceStandard] = useState(prices?.find((x) => x.bundle === 'standard'));
  const [pricePlus] = useState(prices?.find((x) => x.bundle === 'plus'));

  const add = useCallback(
    (price, index) => {
      const obj = {
        from,
        to,
        dep,
        arr,
        price,
      };
      addAction({ obj, type });
    },
    [addAction, arr, dep, from, to, type],
  );

  return (
    <div className="ticket-item">
      <div className="time">
        {dayjs(dep).format('HH:mm')}
        <img src={'/assets/icons/icon-arrow-small-right.svg'} alt="arrow right icon" />
        {dayjs(arr).format('HH:mm')}
      </div>
      <div className="prices">
        <div className="price-box-list">
          {pricesBasic && (
            <div className="price-box-wrapper">
              <div onClick={() => add(pricesBasic, 1)} className="price-box">
                ${pricesBasic?.price}
              </div>
            </div>
          )}
          {priceStandard && (
            <div className="price-box-wrapper highlight">
              <div onClick={() => add(priceStandard, 2)} className="price-box">
                ${priceStandard?.price}
              </div>
            </div>
          )}
          {pricePlus && (
            <div className="price-box-wrapper">
              <div onClick={() => add(pricePlus, 3)} className="price-box">
                ${pricePlus?.price}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TicketListPanel = ({
  title,
  from,
  to,
  searchdata,
  type,
  depdate,
  noreturndate = false,
  research,
  loading = false,
  mindate,
}) => {
  const [returnfield, setreturnfield] = useState({ value: '', name: 'return', required: false });
  const [returnfieldIsValid] = useState(null);

  const search = () => {
    research(returnfield);
  };

  return (
    <div className="ticketlistpanel">
      <div className="panel-header">
        <div className="title">{title}</div>
        <div className="from-to">
          <div className="cityname">{from}</div>
          <img src={'/assets/icons/icon-arrow-right-black.svg'} alt="arrow right icon" />
          <div className="cityname">{to}</div>
        </div>
      </div>

      {loading && <Loader />}

      {noreturndate && !loading && (
        <div className="noreturndate">
          <DateField
            name="retunr"
            label="Return"
            placeholder="Return"
            stateobject={returnfield}
            setter={setreturnfield}
            icon={calendaricon}
            mindate={new Date(dayjs(mindate).add(1, 'day')) || new Date()}
            validation={returnfieldIsValid}
            onChangeHandler={(state) => setreturnfield(state)}
            warningmsg="Date is incorrect"
          />
          <button className="noreturndate-button" type="button" onClick={search}>
            SEARCH
          </button>
        </div>
      )}
      {!noreturndate && !loading && (
        <div>
          <div className="date-choose">
            <div className="left-part">
              <img src={'/assets/icons/icon-arrow-right-chevron.svg'} alt="arrow right icon" />
              <span className="date">{dayjs(depdate).subtract(1, 'day').format('ddd, D MMMM')}</span>
            </div>
            <div className="middle-part">{dayjs(depdate).format('dddd, D MMMM YYYY')}</div>
            <div className="right-part">
              <span className="date">{dayjs(depdate).add(1, 'day').format('ddd, D MMMM')}</span>
              <img src={'/assets/icons/icon-arrow-left-chevron.svg'} alt="arrow right icon" />
            </div>
          </div>
          <div className="tickets">
            {searchdata?.length > 0 && (
              <div className="price-category">
                <div></div>
                <div>
                  <div>basic</div>
                  <div>standard</div>
                  <div>plus</div>
                </div>
              </div>
            )}
            {searchdata
              ?.sort((x, y) => new Date(x.arrival) - new Date(y.arrival))
              .map((x, i) => (
                <TicketItem
                  from={from}
                  to={to}
                  key={i}
                  dep={x.departure}
                  arr={x.arrival}
                  prices={x.fares}
                  type={type}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketListPanel;
