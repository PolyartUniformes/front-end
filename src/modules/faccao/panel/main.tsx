import styles from "../styles/create.module.css";
import Infos from "./infos";

function Panel() {
  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <p>PAINEL DO FACCIONISTA</p>
      </div>
      <Infos />
    </div>
  );
}

export default Panel;
