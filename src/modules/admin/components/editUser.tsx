import { useState, ChangeEvent, useEffect } from "react";
import { getUsers } from "../../../services/admin";
import styles from "../styles/admin.module.css";
import role from "../utils/roles.json";

import { admin } from "../../../services/admin";

const EditUser = () => {
  const [employees, setEmployees] = useState<any>([]);
  const [values, setValues] = useState({});
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const handleUsers = async () => {
      const response = await getUsers();
      const data = await response.json();
      setEmployees(data.users);
    };
    handleUsers();
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    const newValues = { ...values, [name]: value };

    setValues(newValues);
  };

  function addRole(event: ChangeEvent<HTMLInputElement>) {
    let rolesList = [...roles];

    if (event.target.checked) {
      rolesList = [...roles, event.target.value];
    } else {
      rolesList.splice(roles.indexOf(event.target.value), 1);
    }

    setRoles(rolesList);

    setValues({ ...values, ["roles"]: rolesList.toString() });
  }

  console.log(values);

  return (
    <div className={styles.content}>
      <div>
        <select name="uuid" onChange={(e) => handleChange(e)}>
          <option value="">Selecione um usuário...</option>
          {employees?.map((e: any, i: number) => {
            return (
              <option key={i} value={e.uuid}>
                {e.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <div>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            placeholder="Nome..."
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email..."
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="password">Nova senha</label>
          <input
            type="text"
            name="password"
            placeholder="Não é possível ver a senha atual."
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div>
        <p>Acessos do usuário:</p>
        <div className={styles.roles}>
          {role.map((e, i) => {
            return (
              <div key={i} className={styles.managementRoles}>
                <input
                  type="checkbox"
                  value={e.value}
                  onChange={(event) => addRole(event)}
                />
                <p>{e.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.saveButton}>
        <button onClick={() => admin.update(values)}>EDITAR USUÁRIO</button>
      </div>
    </div>
  );
};

export default EditUser;
