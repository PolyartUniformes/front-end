import { post } from "../../../../../../services/api";
import status from "../../../utils/status.json";

async function changeStatus(uuid: string, code: number) {
  const response = await post("ordem-de-corte/status/", { uuid, code });

  const data = await response.json();

  return data;
}

function setStatus(value: number) {
  if (!value) {
    return "Sem status!";
  }

  let result = status.filter((element) => element.code === value);

  return result[0].name;
}

export { setStatus, changeStatus };
