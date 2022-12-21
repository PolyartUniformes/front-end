import { get, post } from "../../../../../services/api";

class Estoque {
  async update(element: any) {
    const response = await post("estoque/update/", { element });
    return await response.json();
  }

  async create(element: any) {
    const response = await post("estoque/create/", { element });
    return await response.json();
  }
}

const estoque = new Estoque();

export { estoque };
