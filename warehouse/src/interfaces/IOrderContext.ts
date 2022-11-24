import IOrder from "./IOrder";

interface IOrderContext{
    orders: IOrder[];
    deleteOrderById: (id: number) => void;
}

export default IOrderContext;