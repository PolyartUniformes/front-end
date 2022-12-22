import { me } from "./services/auth";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AuthProvider({ chlid }: any) {
  const [token, setToken] = useState<boolean>();

  useEffect(() => {
    async function token() {
      const res = await me();
      setToken(res.ok);

      const data = await res.json();
      localStorage.setItem("uuid", data.uuid);
    }
    token();
  }, []);

  function Loading() {
    return (
      <div className="loadingToken">
        <p>Loading...</p>
      </div>
    );
  }

  if (token === undefined) {
    return <Loading />;
  } else if (token) {
    return chlid;
  } else {
    localStorage.clear();
    return <Navigate to={"/login"} replace />;
  }
}

export { AuthProvider };
