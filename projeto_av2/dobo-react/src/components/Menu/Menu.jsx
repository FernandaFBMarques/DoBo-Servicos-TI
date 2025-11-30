import React, { useEffect, useState } from "react";
import "./Menu.css";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Menu() {
  const navigate = useNavigate()

  const location = useLocation();

  const [logado, setLogado] = useState(
    localStorage.getItem("usuarioLogado") === "true"
  );

  useEffect(() => {
    const novoValor = localStorage.getItem("usuarioLogado") === "true";
    
    setLogado((valorAtual) => {
      if (valorAtual !== novoValor) {
        return novoValor;
      }
      return valorAtual; // não dispara re-render
    });
  }, [location.pathname]);
  

  function logout() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("usuario");

    setLogado(false);

    alert("Logout realizado com sucesso! 🐾");

    navigate("/");
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
            <Link to="/servico" className="link-header">Serviços de TI</Link>
            <Link to="/carrinho" className="link-header">Carrinho</Link>
            <button className="logout-btn" onClick={logout}>
              <FontAwesomeIcon icon={faRightFromBracket}/>
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
