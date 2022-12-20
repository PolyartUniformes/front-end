import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/auth";

import styles from "../modules/login/login.module.css";

export function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const res = await login(name.toUpperCase(), password);
    setLoading(false);

    const data = await res.json();

    if (!res.ok) {
      return alert(data);
    }

    localStorage.setItem("token", JSON.stringify(data.token));
    return navigate("/");
  };

  return (
    <div className={styles.container}>
      <main className={styles.form}>
        <h3 className={styles.apiResponse}>
          {loading ? "AGUARDE..." : "SISTEMA INTERNO"}
        </h3>
        <div className={styles.inputs}>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={() => handleLogin()} disabled={loading}>
            ENTRAR
          </button>
        </div>
      </main>
    </div>
  );
}
