import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useRecoilValue } from 'recoil';
import { GetAllStation, Search } from '../adapters/requests';
import CartPanel from '../components/CartPanel';
import ModalComponent from '../components/Modal';
import TicketListPanel from '../components/TicketListPanel';
import Modal from 'react-modal';
import { cart } from '../state/atoms';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const SelectFlightPage = () => {
  const cartAtom = useRecoilValue(cart);
  const search = useLocation().search;
  const [stations, setstations] = useState([]);
  const [searchData, setsearchData] = useState([]);
  const [searchReturnData, setsearchReturnData] = useState([]);
  const departure = new URLSearchParams(search).get('dep');
  const arrival = new URLSearchParams(search).get('arr');
  const depdate = new URLSearchParams(search).get('depdate');
  const retdate = new URLSearchParams(search).get('retdate');
  const [fromCity, setFromCity] = useState();
  const [toCity, setToCity] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const payNow = () => {
    console.log('pay');
    toggleModal();
  };

  const SearchFn = useCallback(async (departure, arrival, depdate, isreturn = false) => {
    try {
      const resp = await Search(departure, arrival, depdate);
      if (isreturn) {
        setsearchReturnData(resp.data);
      } else {
        setsearchData(resp.data);
      }
    } catch (e) {
      console.log('Error');
    }
  }, []);

  const ResearchFn = useCallback(
    (returndate) => {
      if (dayjs(returndate.value).isAfter(depdate)) {
        SearchFn(arrival, departure, returndate.value, true);
      } else {
        console.log('Dátumok nemj jó');
      }
    },
    [SearchFn, arrival, departure, depdate],
  );

  useEffect(() => {
    if (stations?.length) {
      setFromCity(stations.find((x) => x.iata === departure));
      setToCity(stations.find((x) => x.iata === arrival));
    }
  }, [arrival, departure, stations, toCity]);

  useEffect(() => {
    const getstations = async () => {
      try {
        const response = await GetAllStation();
        setstations(response.data);
      } catch (e) {
        console.log('Error during get stations');
      }
    };

    getstations();
    SearchFn(departure, arrival, depdate);
    if (retdate) {
      SearchFn(arrival, departure, retdate, true);
    }
  }, [SearchFn, arrival, departure, depdate, retdate]);

  return (
    <div className="selectflight-page">
      <div className="header">
        <div>
          <Link className="linktohome" to="/">
            <img src={'/assets/icons/icon-plus.svg'} alt="plus icon" />
          </Link>
          <div className="fromto">
            <div className="from-station">
              <span>Leaving from</span>
              <p>{fromCity?.shortName}</p>
            </div>
            <div className="arrow-icons">
              <img src={'/assets/icons/icon-arrow-right-white.svg'} alt="arrow right icon" />
              <img src={'/assets/icons/icon-arrow-left-white.svg'} alt="arrow left icon" />
            </div>
            <div className="to-station">
              <p>{toCity?.shortName}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="body mapbg">
        <div className="title-panel">
          <img src={'/assets/icons/icon-flight.svg'} alt="flight icon" />
          <h1>Select flight</h1>
        </div>
        <div className="content-panel">
          <div className="cart">
            <CartPanel />
            <button
              type="button"
              className={`paybutton ${cartAtom.from && cartAtom.to ? '' : 'disabled'}`}
              disabled={!(cartAtom.from && cartAtom.to)}
              onClick={payNow}
            >
              pay now
            </button>
          </div>
          <div className="tickets">
            <TicketListPanel
              title="outbound"
              from={fromCity?.shortName}
              to={toCity?.shortName}
              searchdata={searchData}
              depdate={depdate}
              type="from"
            />
            {searchReturnData.length > 0 ? (
              <TicketListPanel
                title="inbound"
                from={toCity?.shortName}
                to={fromCity?.shortName}
                searchdata={searchReturnData}
                depdate={retdate}
                type="to"
              />
            ) : (
              <TicketListPanel
                title="inbound"
                from={toCity?.shortName}
                to={fromCity?.shortName}
                searchdata={searchReturnData}
                depdate={retdate}
                noreturndate
                research={(date) => ResearchFn(date)}
                type="to"
              />
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        ariaHideApp={false}
        closeTimeoutMS={500}
      >
        <ModalComponent toggleModal={toggleModal} />
      </Modal>
    </div>
  );
};

export default SelectFlightPage;
