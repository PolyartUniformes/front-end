import { post } from "../../../../../../services/api";
import { DataJSON } from "../../../../../../utils/types";

async function handleEdition(element: DataJSON) {
  const response = await post("ordem-de-corte/edit/", { element });

  const data = await response.json();

  return data;
}

export { handleEdition };
