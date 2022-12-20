import { ChangeEvent, useState } from "react";

import { createUser } from "../../../services/admin";

import role from "../utils/roles.json";

import styles from "../styles/admin.module.css";

export default function EmployeeCreation() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  function addRole(event: ChangeEvent<HTMLInputElement>) {
    let rolesList = [...roles];

    if (event.target.checked) {
      rolesList = [...roles, event.target.value];
    } else {
      rolesList.splice(roles.indexOf(event.target.value), 1);
    }

    setRoles(rolesList);
  }

  async function handleSubmit() {
    setLoading(true);
    const res = await createUser(
      name.toUpperCase(),
      email.toUpperCase(),
      password,
      roles.toString()
    );
    setLoading(false);

    const data = await res.json();

    if (!res.ok) {
      return alert(data);
    } else {
      return alert(data);
    }
  }

  return (
    <div className={styles.content}>
      <div>
        <div>
          <label htmlFor="name">
            Nome <b style={{ color: "red" }}>*</b>
          </label>
          <input
            type="text"
            placeholder="Nome..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">
            Senha <b style={{ color: "red" }}>*</b>
          </label>
          <input
            type="text"
            placeholder="Senha..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <p>Selecione os acessos:</p>

        <div className={styles.roles}>
          {role.map((e) => {
            return (
              <div key={e.id} className={styles.managementRoles}>
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
        {loading ? (
          <button style={{ backgroundColor: "goldenrod" }}>AGUARDE...</button>
        ) : (
          <button onClick={handleSubmit}>CRIAR USUÁRIO</button>
        )}
      </div>
    </div>
  );
}
