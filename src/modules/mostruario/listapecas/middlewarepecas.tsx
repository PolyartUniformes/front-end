import { useEffect, useState } from "react";
import { mostruario } from "../functions/mostruario";
import Pagination from "./paginationpecas";

type List = {
  update: boolean;
  value: string;
};

function Middleware({ update, value }: List) {
  const [data, setData] = useState<any>([]);

  const [parents, setParents] = useState<any>([]);

  console.log(parents);

  useEffect(() => {
    async function getData() {
      const teste = await mostruario.getParentsData();
      setParents(teste);

      setData([]);
      const response = await mostruario.filterchild(value);
      setData(response);
    }
    getData();
  }, [update, value]);

  return <Pagination data={data} parents={parents} />;
}

export { Middleware };
