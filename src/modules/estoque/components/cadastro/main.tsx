import styles from "../../styles/cadastro.module.css";
import { ChangeEvent, useState } from "react";
import { estoque } from "../list/functions/estoque";

const EstoqueCadastro = () => {
  const [values, setValues] = useState({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value.toUpperCase();

    if (name === "quantidade") {
      const qnt = parseFloat(value);
      setValues({ ...values, [name]: qnt });
    } else setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    const response = await estoque.create(values);
    alert(response);
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <p>CADASTRO DE TECIDOS NO ESTOQUE</p>
      </div>
      <div className={styles.cadastro}>
        <div className={styles.doisinput}>
          <div className={styles.item}>
            <label>TECIDO</label>
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              name="tecido"
            />
          </div>
          <div className={styles.item}>
            <label>COMPOSIÇÃO</label>
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              name="composicao"
            />
          </div>
        </div>
        <div className={styles.cincoinput}>
          <div className={styles.item}>
            <label>QUANTIDADE</label>
            <input
              type="number"
              min={0.0}
              step={0.01}
              onChange={(e) => handleChange(e)}
              name="quantidade"
            />
          </div>
          <div className={styles.item}>
            <label>COR</label>
            <input type="text" onChange={(e) => handleChange(e)} name="cor" />
          </div>
          <div className={styles.item}>
            <label>FORNECEDOR</label>
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              name="fornecedor"
            />
          </div>
          <div className={styles.item}>
            <label>METRAGEM</label>
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              name="metragem"
            />
          </div>
          <div className={styles.item}>
            <label>LARGURA</label>
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              name="largura"
            />
          </div>
        </div>
        <button onClick={handleSubmit}>CADASTRAR</button>
      </div>
    </div>
  );
};

export default EstoqueCadastro;
