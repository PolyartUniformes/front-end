import { setFinished } from "../../../services/orders";
import { Faction } from "../../../utils/types";
import { supabase } from "../../ordens/corte/components/lista/functions/handleUpload";
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

  const handleDelete = async (uuid: string) => {
    const { error } = await supabase
      .from("faction_orders")
      .delete()
      .eq("uuid", uuid);

    if (error) return alert(error.message);

    return alert("Serviço removido do faccionista com sucesso!");
  };

  return (
    <div>
      {items &&
        items.map((element, index) => {
          return (
            <div key={index} className={styles.items}>
              <div className={styles.inputsBox}>
                <div className={styles.inputs}>
                  <div className={styles.labelinput}>
                    <label>ENTREGA</label>
                    <input
                      type="text"
                      readOnly
                      value={dateChange(element.deliver_at)}
                    />
                  </div>

                  <div className={styles.labelinput}>
                    <label>VALOR UNIT.</label>
                    <input
                      type="text"
                      readOnly
                      value={`R$ ${parseFloat(element.price).toFixed(2)}`}
                    />
                  </div>

                  <div className={styles.labelinput}>
                    <label>QNTD</label>
                    <input type="text" readOnly value={element.quantity} />
                  </div>
                </div>

                <div className={styles.labelinput}>
                  <label>INSUMOS</label>
                  <textarea
                    cols={30}
                    rows={3}
                    readOnly
                    value={element.insumos}
                  />
                </div>

                <div className={styles.labelinput}>
                  <label>OBSERVAÇÃO</label>
                  <textarea
                    cols={30}
                    rows={3}
                    readOnly
                    value={element.observation}
                  />
                </div>

                <button onClick={() => handleSubmit(element.uuid)}>
                  FINALIZAR
                </button>

                <button
                  style={{ backgroundColor: "red" }}
                  onClick={() => handleDelete(element.uuid)}
                >
                  REMOVER
                </button>
              </div>
              <img src={element.parent_image || ""} alt="" />
            </div>
          );
        })}
    </div>
  );
}
