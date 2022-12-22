import Header from "../../layouts/header";
import { List } from "./components/list";
import { Create } from "./components/create";
import styles from "./styles/index.module.css";
import Panel from "./panel/main";

import { useEffect, useState } from "react";
import { admin } from "../../services/admin";

export function Faccao() {
  const [roles, setRoles] = useState("");

  const uuid = localStorage.getItem("uuid");

  useEffect(() => {
    if (uuid) {
      const api = async () => {
        const data = await admin.me(uuid);
        setRoles(data.roles);
      };
      api();
    }
  }, []);

  return (
    <div className="nav">
      <Header />
      {roles.includes("faccionista") ? null : (
        <div className={styles.container}>
          <div className={styles.box}>
            <List />
          </div>

          <div className={styles.box}>
            <Create />
          </div>
        </div>
      )}

      <div className={styles.subContainer}>
        <div className={styles.box}>
          <Panel />
        </div>
      </div>
    </div>
  );
}
