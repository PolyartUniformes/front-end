import styles from "../styles/create.module.css";
import { useState, useEffect, ChangeEvent } from "react";
import { Data, Faction, User } from "../../../utils/types";
import { faccionistas, getItems } from "../utils/get";
import { create } from "../../../services/orders";

function Create() {
  const [data, setData] = useState<Data>([]);
  const [users, setUsers] = useState<User | []>([]);
  const [values, setValues] = useState<Faction | {}>();

  useEffect(() => {
    const get = async () => {
      setData(await getItems());
      setUsers(await faccionistas());
    };
    get();
  }, []);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const value = { ...values, [event.target.name]: event.target.value };
    setValues(value);
  };

  const handleSubmit = async () => {
    const res = await create(values);
    alert(await res.json());
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <p>CRIAR ORDEM DE FACÇÃO</p>
      </div>
      <div style={{ padding: "5px" }}>
        <div className={styles.inputs}>
          <div>
            <label>Nº DA ORDEM</label>
            <select name="parent_uuid" onChange={(e) => handleChange(e)}>
              <option value="">Selecione</option>
              {data.map((element, index) => {
                return (
                  <option value={element.uuid} key={index}>
                    {element.main_code}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label>FACCIONISTA</label>
            <select name="faccionista" onChange={(e) => handleChange(e)}>
              <option value="">Selecione</option>
              {users.map((element, index) => {
                return <option key={index}>{element.name}</option>;
              })}
            </select>
          </div>

          <div>
            <label>DATA ENTREGA</label>
            <input
              name="deliver_at"
              onChange={(e) => handleChange(e)}
              type="date"
            />
          </div>

          <div>
            <label>VALOR UNITÁRIO</label>
            <input name="price" onChange={(e) => handleChange(e)} type="text" />
          </div>

          <div>
            <label>QUANTIDADE</label>
            <input
              name="quantity"
              type="number"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className={styles.texts}>
          <div>
            <label>INSUMOS</label>
            <textarea
              name="insumos"
              onChange={(e) => handleChange(e)}
              cols={30}
              rows={3}
            />
          </div>

          <div>
            <label>OBSERVAÇÕES</label>
            <textarea
              name="observation"
              onChange={(e) => handleChange(e)}
              cols={30}
              rows={3}
            />
          </div>
        </div>

        <button style={{ marginTop: "5px" }} onClick={handleSubmit}>
          CRIAR
        </button>
      </div>
    </div>
  );
}

export { Create };
