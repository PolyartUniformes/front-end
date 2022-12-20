import styles from "../../styles/cadastro.module.css";
import Inputs from "./inputs";

const Cadastro = () => {
  return (
    <div>
      <div className={styles.title}>
        <p>CADASTRO DE ORDENS DE CORTE</p>
      </div>
      <Inputs />
    </div>
  );
};

export { Cadastro };
