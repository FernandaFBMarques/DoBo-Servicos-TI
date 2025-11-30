import React from "react";
import FormBuilder from "../../components/FormUser/FormUser";
import { useNavigate } from "react-router-dom";

import validarEmail from "../../utils/validarEmail";


export default function Login() {
  const navigate = useNavigate();

  async function enviarLogin(values, setErros) {
    const erros = {};

    if (!values.email) {
      erros.email = "Digite seu e-mail.";
    } else if (!validarEmail(values.email)) {
      erros.email = "Digite um e-mail válido.";
    }

    if (!values.senha) {
      erros.senha = "Digite sua senha.";
    }

    if (Object.keys(erros).length > 0) {
      setErros(erros);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: values.email,   
          senha: values.senha
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.detail?.mensagem) {
          setErros({ senha: data.detail.mensagem });
        } else {
          setErros({ senha: "Erro ao tentar fazer login." });
        }
        return;
      }

      localStorage.setItem("usuarioLogado", "true");
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      alert("Login realizado com sucesso! 🐾 Bem-vindo(a) à Dobo!");
      navigate("/");

    } catch (error) {
      setErros({ senha: "Erro ao conectar ao servidor." });
      console.error(error);
    }
  }

  return (
    <FormBuilder
      title="Login de Clientes"

      fields={[
        {
          name: "email",
          label: "E-mail",
          type: "email",
          placeholder: "Digite seu e-mail"
        },
        {
          name: "senha",
          label: "Senha",
          type: "password",
          placeholder: "Digite sua senha"
        }
      ]}

      extraButtons={[
        {
          label: "Limpar campos",
          className: "btn-link btn-limpar",
          type: "button",
          onClick: () => window.location.reload()
        },
        {
          label: "Recuperar senha",
          className: "btn-link",
          type: "button",
          onClick: () => navigate("/recuperar-senha")
        }
      ]}

      onSubmit={enviarLogin}
    />
  );
}
