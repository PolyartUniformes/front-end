import { useEffect, useState } from "react";
import { mapa } from "./functions/mapa";
import Pagination from "./pagination";

type List = {
  update: boolean;
  value: string;
};

function Middleware({ update, value }: List) {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    async function getData() {
      setData([]);
      const response = await mapa.filter(value);
      setData(response);
    }
    getData();
  }, [update, value]);

  return <Pagination data={data} />;
}

export { Middleware };
