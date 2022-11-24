import {useContext} from 'react';
import IOrderContext from '../../interfaces/IOrderContext';
import { OrderContext } from '../../contexts/OrderContext';
import OrderItem from './OrderItem';

const OrderList = () => {

    const {orders} = useContext(OrderContext) as IOrderContext;

    const getOrderItems = () => {
        return orders.map( (order, i) => (
            <OrderItem
                key={`order-${i}`}
                id={order.id}
                name={order.name}
                image={order.image}
            />
        ));
    }

    return (
        <section>
            <h3>Alle ordre</h3>
            <section>{getOrderItems()}</section>
        </section>
    )
}

export default OrderList;