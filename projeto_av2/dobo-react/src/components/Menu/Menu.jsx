import React, { useState } from "react";
import "./Menu.css";
import { Link } from "react-router-dom";

export default function Menu() {
  const [logado, setLogado] = useState(() => {
    return localStorage.getItem("usuarioLogado") === "true";
  });

  function logout() {
    localStorage.removeItem("usuarioLogado");
    setLogado(false);
    window.location.href = "/";
  }

  return (
    <header className="menu-superior">
      <Link to="/" className="logo-link">
        <img
          src="assets/dobo_logo_sem_nome.png"
          alt="Logo Dobo Serviços de TI"
          className="logo"
        />
      </Link>

      <nav className="menu-links">
        {!logado && (
          <>
            <Link to="/login" className="link-header">Login</Link>
            <Link to="/cadastro" className="link-header">Cadastrar</Link>
          </>
        )}

        {logado && (
          <>
            <Link to="/carrinho" className="link-header">Serviços de TI</Link>
            <button className="link-header logout-btn" onClick={logout}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
