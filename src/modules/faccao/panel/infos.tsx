import styles from "../styles/infos.module.css";

import { useEffect, useState, ChangeEvent } from "react";
import { faccionistas, getServices, getData } from "../utils/get";
import { Faction, User } from "../../../utils/types";
import Pagination from "./pagination";

type UserObject = {
  wallet: string;
  quantity: number;
  late: number;
  orders: number;
  finished: number;
};

export default function Infos() {
  const [users, setUsers] = useState<User | []>([]);

  const [element, setElement] = useState<UserObject | null>(null);

  const [order, setOrder] = useState<Faction[]>([]);

  useEffect(() => {
    const get = async () => {
      setUsers(await faccionistas());
    };
    get();
  }, []);

  const handleSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (!value) return setElement(null);

    const list: [Faction] = await getServices();

    const user = users.filter((e) => e.name === value)[0];

    const orders = list.filter((e) => e.faccionista === user.name);

    setOrder(orders);

    const quantity = orders.reduce((x, y) => x + parseInt(y.quantity), 0);

    const lateData = orders.filter((element) => {
      const date1 = new Date();
      const date2 = new Date(element.deliver_at);

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

      if (result >= 0 || element.finished) {
        return false;
      }

      return true;
    });

    const delivered = orders.filter((e) => e.finished);

    const wallet = delivered
      .map((e) => parseInt(e.quantity) * parseFloat(e.price))
      .reduce((x, y) => x + y, 0)
      .toFixed(2);

    setElement({
      wallet,
      quantity,
      late: lateData.length,
      orders: orders.length,
      finished: delivered.length,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <select onChange={(e) => handleSelect(e)}>
          <option value="">Selecione</option>
          {users.map((element, index) => {
            return (
              <option key={index} value={element.name}>
                {element.name}
              </option>
            );
          })}
        </select>

        <input
          type="text"
          value={element ? `ORDENS: ${element.orders}` : "ORDENS: 0"}
          readOnly
        />

        <input
          type="text"
          value={element ? `PEÇAS: ${element.quantity}` : "PEÇAS: 0"}
          readOnly
        />

        <input
          type="text"
          value={element ? `ATRASADAS: ${element.late}` : "ATRASADAS: 0"}
          readOnly
        />

        <input
          type="text"
          value={element ? `ENTREGUES: ${element.finished}` : "ENTREGUES: 0"}
          readOnly
        />

        <input
          type="text"
          value={element ? `TOTAL: R$ ${element.wallet}` : "TOTAL: R$ 0.00"}
          readOnly
        />
      </div>

      <div>
        <Pagination data={order} />
      </div>
    </div>
  );
}
