import { get, post } from "../../../services/api";

class Mostruario {
  async update(element: any) {
    const response = await post("estoque/update/", { element });
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
}

const mostruario = new Mostruario();

export { mostruario };
