import { useEffect, useState } from "react";
import { filterData } from "../utils/filter";
import { Data } from "../../../utils/types";
import PaginatedItems from "./pagination";

type List = {
  update: boolean;
  filter: { code: number; name: string };
  value: string;
  itemsLimit: number;
};

function ListContent({ update, filter, value, itemsLimit }: List) {
  const [data, setData] = useState<Data | []>([]);

  useEffect(() => {
    async function getData() {
      setData([]);
      const response = await filterData(filter.code, value);
      setData(response.items);
    }
    getData();
  }, [update, filter, value]);

  return <PaginatedItems data={data} filter={filter} itemsLimit={itemsLimit} />;
}

export { ListContent };
