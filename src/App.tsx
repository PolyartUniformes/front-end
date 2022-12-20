import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./authProvider";
import {
  Home,
  Login,
  Admin,
  Faccao,
  OrdensDeCorte,
  Mapa,
  Estoque,
  Mostruario,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthProvider chlid={<Home />} />} />

        <Route path="/admin" element={<AuthProvider chlid={<Admin />} />} />

        <Route path="/faccao" element={<AuthProvider chlid={<Faccao />} />} />

        <Route
          path="/ordens-de-corte"
          element={<AuthProvider chlid={<OrdensDeCorte />} />}
        />

        <Route path="/mapa" element={<AuthProvider chlid={<Mapa />} />} />

        <Route path="/estoque" element={<AuthProvider chlid={<Estoque />} />} />

        <Route
          path="/mostruario"
          element={<AuthProvider chlid={<Mostruario />} />}
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
