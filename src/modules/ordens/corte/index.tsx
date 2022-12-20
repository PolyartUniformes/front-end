import Header from "../../../layouts/header";
import { Cadastro } from "./components/cadastro/main";
import { List } from "./components/lista/main";
import styles from "./styles/index.module.css";

const OrdensDeCorte = () => {
  return (
    <div className="nav">
      <Header />
      <div className={styles.container}>
        <div className={styles.box}>
          <List />
        </div>

        <div className={styles.box}>
          <Cadastro />
        </div>
      </div>
    </div>
  );
};

export { OrdensDeCorte };
