import { get, post } from "./api";

const getList = async (category: number) => {
  return await post("getList/", { category });
};

const create = async (values: any) => {
  return await post("create/", { values });
};

const getFactionList = async () => {
  return await get("get-faction-orders/");
};

const setFinished = async (uuid: string) => {
  return await post("finished/", { uuid });
};

export { getList, create, getFactionList, setFinished };
