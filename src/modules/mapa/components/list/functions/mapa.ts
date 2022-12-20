import { get, post } from "../../../../../services/api";

type Data = {
  tecido: string;
  cor: string;
  composicao: string;
  fornecedor: string;
  id: number;
};

class Mapa {
  async filter(value: string) {
    const response = await get("mapa/list/");
    const data = await response.json();

    let result = [];

    if (value) {
      return data.filter((element: Data) => {
        if (element.id === parseInt(value)) {
          return result.push(element);
        } else if (!element.cor.search(value)) {
          return result.push(element);
        } else if (!element.composicao.search(value)) {
          return result.push(element);
        } else if (!element.fornecedor.search(value)) {
          return result.push(element);
        } else if (!element.tecido.search(value)) {
          return result.push(element);
        } else {
          return null;
        }
      });
    }

    return data;
  }

  async update(id: number, quantity: number) {
    const response = await post("mapa/update/", { id, quantity });
    const data = await response.json();
    return data;
  }
}

const mapa = new Mapa();

export { mapa };
