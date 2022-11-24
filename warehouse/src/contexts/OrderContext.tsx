import { useEffect, useState, createContext, ReactNode } from "react";
import IOrderContext from "../interfaces/IOrderContext";
import IOrder from "../interfaces/IOrder";
import WarehouseService from "../services/WarehouseService";

export const OrderContext = createContext<IOrderContext | null>(null);

type Props = {
  children: ReactNode;
};

const OrderProvider = ({ children }: Props) => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    getOrdersFromService();
  }, []);

  const getOrdersFromService = async () => {
    debugger;
    const ordersFromService = await WarehouseService.getAll();
    setOrders(ordersFromService);
  };

  const deleteOrderById = async (id: number) => {
    debugger;
    await WarehouseService.deleteOrder(id);
    const newArray = orders.filter((order) => order.id != id);
    setOrders(newArray);
  };

  return (
    <OrderContext.Provider value={{ orders, deleteOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
