import { useRecoilValue } from 'recoil';
import { cart } from '../state/atoms';
import { price } from '../state/selectors';
import CartElement from './CartElement';

const ModalComponent = ({ toggleModal }) => {
  const cartAtom = useRecoilValue(cart);
  const cartPrice = useRecoilValue(price);
  return (
    <div className="modal-component">
      <div className="modal-header">Thanks for buying your tickets at mito airlines</div>
      <div className="modal-content">
        <CartElement ticket={cartAtom.from} myclass="ticket-element" />
        <CartElement ticket={cartAtom.to} myclass="ticket-element" />
      </div>
      <div className="modal-footer">
        <div>
          <span>Total:</span>
          <span>${cartPrice}</span>
        </div>
        <div onClick={toggleModal}>no, thanks (reset)</div>
      </div>
    </div>
  );
};

export default ModalComponent;
