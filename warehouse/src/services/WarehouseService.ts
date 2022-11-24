import axios from "axios";

const WarehouseService = (
    () => {

        const warehouseApiEndpoints = {
            orders: "https://localhost:7085/order"
        }

        const getAll = async () => {
            const result = await axios.get(warehouseApiEndpoints.orders);
            return result.data;
        }

        const deleteOrder = async (id: number) => {
            const result = await axios.delete(`${warehouseApiEndpoints.orders}/${id}`);
            console.log(result);
            return result; // TODO: ordne slik at vi returnerer noe fornuftig til GUI, f.eks true/false
        }


        

        return {
            getAll,
            deleteOrder
        }
    }
)();

export default WarehouseService;