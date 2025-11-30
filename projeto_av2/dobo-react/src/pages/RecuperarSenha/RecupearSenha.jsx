import React from "react";
import FormBuilder from "../../components/FormUser/FormUser";
import { useNavigate } from "react-router-dom";
import validarEmail from "../../utils/validarEmail";
import validarSenha from "../../utils/validarSenha";

export default function RecuperarSenha() {
  const navigate = useNavigate();

  async function enviarRecuperacao(values, setErros) {
    const erros = {};

    if (!values.email) {
      erros.email = "Informe o e-mail.";
    } else if (!validarEmail(values.email)) {
      erros.email = "Digite um e-mail válido.";
    }

    if (!values.novaSenha) {
      erros.novaSenha = "Digite a nova senha.";
    } else if (!validarSenha(values.novaSenha)) {
      erros.novaSenha =
        "Senha inválida. Deve ter 6+ caracteres, 1 maiúscula, 1 número e 1 símbolo permitido.";
    }

    if (!values.confirmarSenha) {
      erros.confirmarSenha = "Confirme sua nova senha.";
    } else if (values.confirmarSenha !== values.novaSenha) {
      erros.confirmarSenha = "As senhas não coincidem.";
    }

    if (Object.keys(erros).length > 0) {
      setErros(erros);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/recuperar-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: values.email,
          nova_senha: values.novaSenha
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.detail?.mensagem) {
          alert(data.detail.mensagem);
        } else {
          alert("Erro ao atualizar a senha. Tente novamente.");
        }
        return;
      }

      alert("Senha atualizada com sucesso! 🐾");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Erro ao conectar ao servidor.");
    }
  }

  return (
    <FormBuilder
      title="Recuperar Senha"

      fields={[
        {
          name: "email",
          label: "E-mail (login)",
          type: "email",
          placeholder: "Digite seu e-mail"
        },
        {
          name: "novaSenha",
          label: "Nova senha",
          type: "password",
          placeholder: "Digite sua nova senha"
        },
        {
          name: "confirmarSenha",
          label: "Confirmar nova senha",
          type: "password",
          placeholder: "Repita sua nova senha"
        }
      ]}

      extraHtml={
        <div className="instrucoes-senha">
          <p>
            Sua nova senha deve ter pelo menos <strong>6 caracteres</strong>, incluir
            <strong> 1 letra maiúscula</strong>, <strong>1 número</strong> e 
            <strong> 1 caractere especial</strong> permitido 
            (<code>@ # $ % & * ! ? / \ | - _ + . = *</code>).
          </p>

          <p>
            Não são permitidos espaços nem caracteres 
            <code>{` { } [ ] ^ : ; < > " ' , `}</code>.
          </p>
        </div>
      }

      extraButtons={[
        {
          label: "Voltar ao login",
          className: "btn-link",
          type: "button",
          onClick: () => navigate("/login")
        }
      ]}

      onSubmit={enviarRecuperacao}
    />
  );
}
