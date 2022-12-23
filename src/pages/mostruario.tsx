import Header from "../layouts/header";
import CadastroDeMostruario from "../modules/mostruario/components/cadastro";
import { MostruarioList } from "../modules/mostruario/components/list";
import { HistList } from "../modules/mostruario/hist/hist-list";
import { MostruarioListPecas } from "../modules/mostruario/listapecas/listpecas";

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
          <HistList />
        </div>
        <div className={styles.box}>
          <MostruarioListPecas />
        </div>
        <div className={styles.box}>
          <MostruarioList />
        </div>
      </main>
    </div>
  );
}
