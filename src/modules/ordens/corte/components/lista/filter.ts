import { getList } from "../../../../../services/orders";
import { Data } from "../../../../../utils/types";

async function filterData(category: number, value: string) {
  try {
    const res = await getList(category);
    const response = await res.json();

    const data: Data = response.items;

    let result = [];

    if (value === "") {
      const lateData = data.filter((element) => {
        const date1 = new Date();
        const date2 = new Date(element.deliver_in);

        const utc1 = Date.UTC(
          date1.getFullYear(),
          date1.getMonth(),
          date1.getDate()
        );
        const utc2 = Date.UTC(
          date2.getFullYear(),
          date2.getMonth(),
          date2.getDate()
        );

        const dayMath = 1000 * 60 * 60 * 24;
        const result = Math.floor((utc2 - utc1) / dayMath);

        if (result >= 0 || element.deleted || element.status === 16) {
          return false;
        }

        return true;
      });

      const noLayoutData = data.filter((element) => {
        return element.image_path === null && !element.deleted;
      });

      const deletedData = data.filter((element) => {
        return element.deleted;
      });

      const defaultData = data.filter((element) => {
        return !element.deleted;
      });

      switch (category) {
        case 1:
          return { error: false, message: "", items: lateData };
          break;
        case 2:
          return { error: false, message: "", items: deletedData };
          break;
        case 3:
          return { error: false, message: "", items: noLayoutData };
          break;

        default:
          return { error: false, message: "", items: defaultData };
          break;
      }
    }

    /*
     *
     * Filtros de pesquisas com valor inserido
     *
     */

    const lateData = data.filter((element) => {
      const date1 = new Date();
      const date2 = new Date(element.deliver_in);

      const utc1 = Date.UTC(
        date1.getFullYear(),
        date1.getMonth(),
        date1.getDate()
      );
      const utc2 = Date.UTC(
        date2.getFullYear(),
        date2.getMonth(),
        date2.getDate()
      );

      const dayMath = 1000 * 60 * 60 * 24;
      const result = Math.floor((utc2 - utc1) / dayMath);

      if (result >= 0 || element.deleted || element.status === 16) {
        return false;
      }

      return true;
    });

    const noLayoutData = data.filter((element) => {
      const mainCode = `${element.main_code}`;
      const subCode = `${element.sub_code}`;
      const date = `${element.deliver_in.split("T")[0].split("-")[2]}/${
        element.deliver_in.split("T")[0].split("-")[1]
      }`;

      if (
        !element.image_path &&
        !element.deleted &&
        !element.client.search(value)
      ) {
        return result.push(element);
      } else if (
        !element.image_path &&
        !element.deleted &&
        !element.seller.search(value)
      ) {
        return result.push(element);
      } else if (
        !element.image_path &&
        !element.deleted &&
        mainCode === value
      ) {
        return result.push(element);
      } else if (!element.image_path && !element.deleted && subCode === value) {
        return result.push(element);
      } else if (
        !element.image_path &&
        !element.deleted &&
        !date.search(value)
      ) {
        return result.push(element);
      }

      return null;
    });

    const deletedData = data.filter((element) => {
      const mainCode = `${element.main_code}`;
      const subCode = `${element.sub_code}`;
      const date = `${element.deliver_in.split("T")[0].split("-")[2]}/${
        element.deliver_in.split("T")[0].split("-")[1]
      }`;

      if (element.deleted && !element.client.search(value)) {
        return result.push(element);
      } else if (element.deleted && !element.seller.search(value)) {
        return result.push(element);
      } else if (element.deleted && mainCode === value) {
        return result.push(element);
      } else if (element.deleted && subCode === value) {
        return result.push(element);
      } else if (element.deleted && !date.search(value)) {
        return result.push(element);
      }

      return null;
    });

    const deliveredData = data.filter((element) => {
      const mainCode = `${element.main_code}`;
      const subCode = `${element.sub_code}`;
      const date = `${element.deliver_in.split("T")[0].split("-")[2]}/${
        element.deliver_in.split("T")[0].split("-")[1]
      }`;

      if (
        element.status === 16 &&
        !element.deleted &&
        !element.client.search(value)
      ) {
        return result.push(element);
      } else if (
        element.status === 16 &&
        !element.deleted &&
        !element.seller.search(value)
      ) {
        return result.push(element);
      } else if (
        element.status === 16 &&
        !element.deleted &&
        mainCode === value
      ) {
        return result.push(element);
      } else if (
        element.status === 16 &&
        !element.deleted &&
        subCode === value
      ) {
        return result.push(element);
      } else if (
        element.status === 16 &&
        !element.deleted &&
        !date.search(value)
      ) {
        return result.push(element);
      }

      return null;
    });

    const defaultData = data.filter((element) => {
      const mainCode = `${element.main_code}`;
      const subCode = `${element.sub_code}`;
      const date = `${element.deliver_in.split("T")[0].split("-")[2]}/${
        element.deliver_in.split("T")[0].split("-")[1]
      }`;

      if (!element.deleted && !element.client.search(value)) {
        return result.push(element);
      } else if (!element.deleted && !element.seller.search(value)) {
        return result.push(element);
      } else if (!element.deleted && mainCode === value) {
        return result.push(element);
      } else if (!element.deleted && subCode === value) {
        return result.push(element);
      } else if (!element.deleted && !date.search(value)) {
        return result.push(element);
      }

      return null;
    });

    switch (category) {
      case 1:
        return { error: false, message: "", items: lateData };
        break;
      case 2:
        return { error: false, message: "", items: deletedData };
        break;
      case 3:
        return { error: false, message: "", items: deliveredData };
        break;
      case 4:
        return { error: false, message: "", items: noLayoutData };
        break;

      default:
        return { error: false, message: "", items: defaultData };
        break;
    }
  } catch (error: any) {
    console.log("Hey! An error has ocurred: " + error.message);
    return {
      error: true,
      message: "Api ERROR! Contate um admin!",
      items: [],
    };
  }
}

export { filterData };
