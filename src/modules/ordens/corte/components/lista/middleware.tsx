import { useEffect, useState } from "react";
import { Data } from "../../../../../utils/types";
import { filterData } from "./filter";
import Pagination from "./pagination";

type List = {
  update: boolean;
  filter: { code: number; name: string };
  value: string;
  itemsLimit: number;
};

function Middleware({ update, filter, value, itemsLimit }: List) {
  const [data, setData] = useState<Data | []>([]);

  useEffect(() => {
    async function getData() {
      setData([]);
      const response = await filterData(filter.code, value);
      setData(response.items);
    }
    getData();
  }, [update, filter, value]);

  return <Pagination data={data} filter={filter} itemsLimit={itemsLimit} />;
}

export { Middleware };
