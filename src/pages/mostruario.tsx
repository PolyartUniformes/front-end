import Header from "../layouts/header";
import CadastroDeMostruario from "../modules/mostruario/components/cadastro";
import { MostruarioList } from "../modules/mostruario/components/list";

import styles from "../modules/mostruario/styles/index.module.css";

export function Mostruario() {
  return (
    <div className="nav">
      <Header />
      <main className={styles.container}>
        <div className={styles.box}>
          <CadastroDeMostruario />
        </div>
        <div className={styles.box}>
          <MostruarioList />
        </div>
      </main>
    </div>
  );
}