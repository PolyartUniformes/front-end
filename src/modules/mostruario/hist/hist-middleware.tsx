import { useEffect, useState } from "react";
import { mostruario } from "../functions/mostruario";
import Pagination from "./hist-pagination";

type List = {
  update: boolean;
  value: string;
};

function Middleware({ update, value }: List) {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    async function getData() {
      setData([]);
      const response = await mostruario.getAllClients(value);
      setData(response);
    }
    getData();
  }, [update, value]);

  return <Pagination data={data} />;
}

export { Middleware };
