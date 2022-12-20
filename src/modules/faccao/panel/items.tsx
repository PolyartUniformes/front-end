import { setFinished } from "../../../services/orders";
import { Faction } from "../../../utils/types";
import styles from "./styles/items.module.css";

type Item = {
  items: Faction[];
};

export default function Items({ items }: Item) {
  function dateChange(value: string) {
    return new Date(value).toLocaleString().split(" ")[0];
  }

  const handleSubmit = async (uuid: string) => {
    const res = await setFinished(uuid);
    const data = await res.json();
    alert(data);
  };

  return (
    <div>
      {items &&
        items.map((element, index) => {
          return (
            <div key={index} className={styles.items}>
              <div className={styles.inputsBox}>
                <div className={styles.inputs}>
                  <input
                    type="text"
                    readOnly
                    value={dateChange(element.deliver_at)}
                  />

                  <input
                    type="text"
                    readOnly
                    value={`R$ ${parseFloat(element.price).toFixed(2)}`}
                  />

                  <input type="text" readOnly value={element.quantity} />
                </div>

                <textarea cols={30} rows={3} readOnly value={element.insumos} />

                <textarea
                  cols={30}
                  rows={3}
                  readOnly
                  value={element.observation}
                />

                <button onClick={() => handleSubmit(element.uuid)}>
                  FINALIZAR
                </button>
              </div>
              <img src={element.parent_image || ""} alt="" />
            </div>
          );
        })}
    </div>
  );
}
