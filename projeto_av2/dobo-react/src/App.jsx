import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import RecuperarSenha from "./pages/RecuperarSenha/RecupearSenha";
import Carrinho from "./pages/Carrinho/Carrinho";
import Servicos from "./pages/Servicos/Servicos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="recuperar-senha" element={<RecuperarSenha />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="carrinho" element={<Carrinho />} />
          <Route path="servico" element={<Servicos />} />
        </Route>

        <Route path="*" element={<div>404 - Página Não Encontrada</div>} />

      </Routes>
    </BrowserRouter>
  );
}
