import Header from "../layouts/header";
import Users from "../modules/admin/components/users";

import styles from "../modules/admin/styles/admin.module.css";
import { admin } from "../services/admin";

export function Admin() {
  return (
    <div className="nav">
      <Header />
      <main className={styles.container}>
        <div className={styles.box}>
          <Users />
        </div>
        <div className={styles.box}>
          <button onClick={() => admin.transfer()}>TRANSFERIR DADOS</button>
        </div>
      </main>
    </div>
  );
}
