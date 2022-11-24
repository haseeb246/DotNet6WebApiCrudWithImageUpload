import IOrder from "../../interfaces/IOrder";

const OrderItem = ({id, name, image} : IOrder) => {
    return (
        <article>
             <h3>{name} ({id})</h3>           
             <img src={`https://localhost:7085/order-images/${image}`} />
        </article>
    )
}

export default OrderItem;