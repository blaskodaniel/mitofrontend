import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { cart } from '../state/atoms';
import { price } from '../state/selectors';
import CartElement from './CartElement';

const CartPanel = () => {
  const ticketList = useRecoilValue(cart);
  const cartPrice = useRecoilValue(price);
  return (
    <div className="cartpanel">
      <div className="cart-header">
        <div>Flights</div>
        <div>${cartPrice}</div>
      </div>
      <div className="cart-content">
        {!ticketList.from && !ticketList.to && <p>Choose an outbound flight</p>}
        {ticketList.from && <CartElement ticket={ticketList.from} myclass="ticket-wrapper" />}
        {ticketList.to && <CartElement ticket={ticketList.to} myclass="ticket-wrapper" />}
      </div>
      <div className="cart-footer">
        <div>Total</div>
        <div>${cartPrice}</div>
      </div>
    </div>
  );
};

export default CartPanel;
