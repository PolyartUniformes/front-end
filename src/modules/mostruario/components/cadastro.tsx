import styles from "../styles/cadastro.module.css";
import { useState } from "react";
import { mostruario } from "../functions/mostruario";

const CadastroDeMostruario = () => {
  const [inputs, setInputs] = useState<any>([]);
  const [code, setCode] = useState("");

  const handleChange = (index: number, e: any) => {
    let data = [...inputs];
    data[index][e.target.name] = e.target.value.toUpperCase();
    setInputs(data);
  };

  const add = () => {
    let section = { tamanho: "", item: "" };
    setInputs([...inputs, section]);
  };

  const remove = (index: number) => {
    let data = [...inputs];
    data.splice(index, 1);
    setInputs(data);
  };

  const handleSubmit = async () => {
    const item = { code, items: inputs };

    const data = await mostruario.create(item);

    alert(data);
  };

  return (
    <div>
      <div className={styles.title}>CADASTRO DE LOTES E PEÇAS</div>
      <div className={styles.content}>
        <section className={styles.code}>
          <input
            type="text"
            name="code"
            placeholder="Código ou nome"
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          <button onClick={add} className={styles.addButton}>
            +
          </button>
        </section>
        {inputs.map((element: any, index: number) => {
          return (
            <section className={styles.addedFields} key={index}>
              <input
                type="text"
                placeholder="T"
                value={element.tamanho}
                name="tamanho"
                onChange={(e) => handleChange(index, e)}
              />
              <input
                type="text"
                placeholder="Item"
                value={element.nome}
                name="item"
                style={{ textAlign: "left" }}
                onChange={(e) => handleChange(index, e)}
              />
              <button
                onClick={() => remove(index)}
                className={styles.closeButton}
              >
                X
              </button>
            </section>
          );
        })}
        <button className={styles.addButton} onClick={handleSubmit}>
          CADASTRAR
        </button>
      </div>
    </div>
  );
};

export default CadastroDeMostruario;
