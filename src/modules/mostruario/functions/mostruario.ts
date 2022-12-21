import { get, post } from "../../../services/api";

class Mostruario {
  async update(element: any) {
    const response = await post("mostruario/update/", { element });
    return await response.json();
  }

  async filter(value: string) {
    const response = await get("mostruario/list/");
    const data = await response.json();

    let result = [];

    if (value) {
      return data.filter((element: any) => {
        if (!element.code.search(value)) {
          return result.push(element);
        } else {
          return null;
        }
      });
    }

    return data;
  }

  async create(element: any) {
    const response = await post("mostruario/create/", { element });
    return await response.json();
  }

  async getChild(uuid: string) {
    const response = await post("mostruario/child/", { uuid });
    return await response.json();
  }

  async rent(element: any) {
    if (!element.cliente || !element.documento) {
      return "Campos com * são obrigatórios!";
    }

    const response = await post("mostruario/rent/", { element });
    return await response.json();
  }

  async unrent(element: any) {
    if (!element.items) return "Você não selecionou nenhuma peça!";

    const response = await post("mostruario/unrent/", { element });
    return await response.json();
  }

  async deleteItem(uuid: string) {
    const response = await post("mostruario/delete/", { uuid });
    return await response.json();
  }

  async getCliente(uuid: string) {
    const response = await post("mostruario/getCliente/", { uuid });
    return await response.json();
  }
}

const mostruario = new Mostruario();

export { mostruario };
