import styles from "../../styles/list.module.css";
import { useState, ChangeEvent } from "react";
import { estoque } from "./functions/estoque";

const Items = ({ items }: any) => {
  const [selected, setSelected] = useState<number | null>(null);

  const [values, setValues] = useState({});

  const handleClick = (id: number) => {
    setSelected(id);
    setValues({ ...values, ["id"]: id });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    const result = { ...values, [name]: value };

    setValues(result);
  };

  const handleSubmit = async () => {
    const response = await estoque.update(values);
    alert(response);
  };

  if (items.length > 0) {
    return (
      <div style={{ marginTop: "10px" }}>
        {items &&
          items.map((element: any, index: number) => {
            return selected === element.id ? (
              <div key={index}>
                <div className={styles.listedGridSelected}>
                  <input type="text" value={element.id} readOnly />
                  <input type="text" value={element.tecido} readOnly />
                  <input type="text" value={element.cor} readOnly />
                  <input type="text" value={element.composicao} readOnly />
                  <input type="text" value={element.quantidade} readOnly />
                  <input type="text" value={element.largura || ""} readOnly />
                </div>
                <div className={styles.updateQuantity}>
                  <div className={styles.updateInputs}>
                    <input
                      type="number"
                      min={0.0}
                      step={0.01}
                      defaultValue={element.quantidade}
                      name="quantity"
                      onChange={(e) => handleChange(e)}
                    />
                    <input
                      type="text"
                      defaultValue={element.tecido}
                      name="tissue"
                      onChange={(e) => handleChange(e)}
                    />
                    <input
                      type="text"
                      defaultValue={element.cor}
                      name="color"
                      onChange={(e) => handleChange(e)}
                    />
                    <input
                      type="text"
                      defaultValue={element.composicao}
                      name="composition"
                      onChange={(e) => handleChange(e)}
                    />
                    <input
                      type="text"
                      defaultValue={element.largura}
                      name="width"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <button onClick={handleSubmit}>SALVAR</button>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className={styles.listedGrid}
                onClick={() => handleClick(element.id)}
              >
                <input type="text" value={element.id} readOnly />
                <input type="text" value={element.tecido} readOnly />
                <input type="text" value={element.cor} readOnly />
                <input type="text" value={element.composicao} readOnly />
                <input type="text" value={element.quantidade} readOnly />
                <input type="text" value={element.largura || ""} readOnly />
              </div>
            );
          })}
      </div>
    );
  }
  return (
    <div>
      <i style={{ color: "red" }}>Nenhum dado encontrado!</i>
    </div>
  );
};

export { Items };
