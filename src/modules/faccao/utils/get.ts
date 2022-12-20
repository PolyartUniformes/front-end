import { getUsers } from "../../../services/admin";
import { getFactionList, getList } from "../../../services/orders";
import { DataJSON } from "../../../utils/types";

const getData = async () => {
  const res = await getList(1);
  const data = await res.json();
  return data.items.filter((e: DataJSON) => {
    return !e.deleted || e.status !== 16;
  });
};

const faccionistas = async () => {
  const res = await getUsers();
  const data = await res.json();
  return data.users.filter((e: any) => {
    return e.roles.includes("faccionista");
  });
};

const getServices = async () => {
  const res = await getFactionList();
  return await res.json();
};

export { getData, faccionistas, getServices };
