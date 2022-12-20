import { useState } from "react";
import { BsPersonPlus, BsPencilSquare } from "react-icons/bs";

import CreateUser from "./createUser";
// import EditUser from "./editUser";

import styles from "../styles/admin.module.css";
import EditUser from "./editUser";

function Users() {
  const [component, setComponent] = useState(<CreateUser />);

  function changeComponent(c: string) {
    switch (c) {
      case "criar":
        setComponent(<CreateUser />);
        break;
      case "editar":
        setComponent(<EditUser />);
        break;
    }
  }
  return (
    <div className={styles.mainContent}>
      <div className={styles.title}>GERENCIAMENTO DE USUÁRIO</div>
      <div className={styles.submenu}>
        <button
          title="CRIAR NOVO USER"
          onClick={() => changeComponent("criar")}
        >
          <BsPersonPlus size={17} />
        </button>
        <button title="EDITAR USER" onClick={() => changeComponent("editar")}>
          <BsPencilSquare size={17} />
        </button>
      </div>
      {component}
    </div>
  );
}

export default Users;
