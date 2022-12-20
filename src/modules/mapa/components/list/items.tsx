import styles from "../../styles/list.module.css";
import { useState } from "react";
import { mapa } from "./functions/mapa";

const Items = ({ items }: any) => {
  const [selected, setSelected] = useState<number | null>(null);

  const [qnt, setQnt] = useState(0);

  const handleClick = (index: number) => {
    setSelected(index);
  };

  const handleSubmit = async (element: any) => {
    if (qnt > element.quantidade) {
      return alert(
        "A quantidade consumida não pode ser maior que a quantidade disponível!"
      );
    }

    if (qnt <= 0) {
      return alert(
        "A quantidade consumida não pode ser menor ou igual a zero!"
      );
    }

    const response = await mapa.update(element.id, qnt);

    return alert(response);
  };

  if (items.length > 0) {
    return (
      <div style={{ marginTop: "10px" }}>
        {items &&
          items.map((element: any, index: number) => {
            return selected === index ? (
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
                  <p>CONSUMIR</p>
                  <input
                    type="number"
                    min={0.0}
                    step={0.01}
                    max={element.quantidade}
                    onChange={(e) => setQnt(e.target.valueAsNumber)}
                  />
                  <p>DE</p>
                  <input type="text" value={element.quantidade} readOnly />
                  <button onClick={() => handleSubmit(element)}>SALVAR</button>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className={styles.listedGrid}
                onClick={() => handleClick(index)}
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
