import axios from "axios";
import { Game } from "../models/game";
import constantsUtils from "./../common/constantsUtil";

const GameService = (() => {
  const apiEndpoints = {
    url: constantsUtils.apiUrl + "game",
  };

  const getAll = async (): Promise<Game[]> => {
    const result = await axios.get(apiEndpoints.url + "/GetAll");
    return result.data;
  };
  const getById = async (id: number): Promise<Game> => {
    let parameters = { id: id };
    const result = await axios.get(apiEndpoints.url + "/getById", {
      params: parameters,
    });
    return result.data;
  };
  const getByName = async (name: string): Promise<Game> => {
    let parameters = { name: name };
    const result = await axios.get(apiEndpoints.url + "/getByName", {
      params: parameters,
    });
    return result.data;
  };
  const create = async (req: any): Promise<boolean> => {
    const result = await axios.post(apiEndpoints.url + "/create", req);
    return result.data;
  };
  const update = async (req: any): Promise<boolean> => {
    const result = await axios.put(`${apiEndpoints.url + "/update"}`, req);
    return result.data;
  };

  const deleteRecord = async (id: number): Promise<boolean> => {
    let parameters = { id: id };
    const result = await axios.delete(apiEndpoints.url + "/Delete", {
      params: parameters,
      data: null,
    });
    console.log(result);
    return result.data; // TODO: ordne slik at vi returnerer noe fornuftig til GUI, f.eks true/false
  };

  return {
    getAll,
    getById,
    getByName,
    create,
    update,
    deleteRecord,
  };
})();

export default GameService;
