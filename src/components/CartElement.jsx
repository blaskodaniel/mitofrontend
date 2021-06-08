import dayjs from 'dayjs';

const CartElement = ({ ticket, myclass }) => {
  return (
    <div className={myclass || 'ticket-wrapper'}>
      <div className="ticket-date">
        <div>{dayjs(ticket.dep).format('MMM')}</div>
        <div>{dayjs(ticket.dep).format('DD')}</div>
      </div>
      <div className="ticket-body">
        <div className="ticket-from-to">
          {ticket.from} - {ticket.to}
        </div>
        <div className="ticket-time">
          {dayjs(ticket.dep).format('ddd HH:mm')} - {dayjs(ticket.arr).format('HH:mm')}
        </div>
      </div>
    </div>
  );
};

export default CartElement;
