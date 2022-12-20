import { post } from "../../../../../../services/api";

async function block(uuid: string) {
  const response = await post("ordem-de-corte/block/", { uuid });

  const data = await response.json();

  return alert(data);
}

async function unBlock(uuid: string) {
  const response = await post("ordem-de-corte/unblock/", { uuid });

  const data = await response.json();

  return alert(data);
}

export { block, unBlock };
