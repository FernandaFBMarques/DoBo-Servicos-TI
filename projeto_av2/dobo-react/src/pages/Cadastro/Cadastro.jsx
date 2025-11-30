import React from "react";
import FormBuilder from "../../components/FormUser/FormUser";
import validarEmail from "../../utils/validarEmail";
import validarSenha from "../../utils/validarSenha"; 
import { useNavigate } from "react-router-dom";

function validarNome(nome) {
  if (!nome?.trim()) return false;
  const partes = nome.trim().split(/\s+/);
  if (partes.length < 2) return false;
  if (partes[0].length < 2) return false;
  const proibidos = /[^a-zA-ZÀ-ÿ\s]/;
  return !proibidos.test(nome);
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  const digito1 = resto > 9 ? 0 : resto;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  const digito2 = resto > 9 ? 0 : resto;

  return cpf.endsWith(`${digito1}${digito2}`);
}

function validarNascimento(dataStr) {
  if (!dataStr) return false;
  const data = new Date(dataStr);
  const hoje = new Date();
  let idade = hoje.getFullYear() - data.getFullYear();
  const m = hoje.getMonth() - data.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < data.getDate())) idade--;
  return idade >= 18;
}

function validarTelefone(tel) {
  if (!tel) return true;
  const padrao = /^\(\d{2}\)\s?\d{5}-\d{4}$/;
  return padrao.test(tel);
}

export default function Cadastro() {
  const navigate = useNavigate();

  async function enviarCadastro(values, setErros) {
    const erros = {};

    if (!validarNome(values.nome))
      erros.nome =
        "Informe o nome completo (duas palavras, sem caracteres especiais).";

    if (!values.email)
      erros.email = "O e-mail é obrigatório."; 
    else if (!validarEmail(values.email))
      erros.email = "Digite um e-mail válido (ex: pet@dobo.com).";

    if (!values.senha)
      erros.senha = "A senha é obrigatória.";
    else if (!validarSenha(values.senha))
      erros.senha =
        "Senha inválida. Deve ter 6+ caracteres, 1 maiúscula, 1 número e 1 símbolo permitido.";

    if (!values.confirmarSenha)
      erros.confirmarSenha = "Confirme sua senha.";
    else if (values.confirmarSenha !== values.senha)
      erros.confirmarSenha = "As senhas não coincidem.";

    if (!values.cpf)
      erros.cpf = "O CPF é obrigatório.";
    else if (!validarCPF(values.cpf))
      erros.cpf = "CPF inválido. Verifique os números digitados.";

    if (!validarNascimento(values.nascimento))
      erros.nascimento =
        "Data de nascimento inválida. É necessário ter 18 anos ou mais.";

    if (!validarTelefone(values.telefone))
      erros.telefone = "Telefone deve estar no formato (00) 00000-0000.";

    if (Object.keys(erros).length > 0) {
      setErros(erros);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
					nome: values.nome,
					login: values.email,          
					senha: values.senha,
					cpf: values.cpf,
					nascimento: values.nascimento,
					telefone: values.telefone,
					escolaridade: values.escolaridade,
					estadoCivil: values.estadoCivil
				})
				,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.detail?.mensagem) {
          alert(data.detail.mensagem);
        } else {
          alert("Erro ao cadastrar. Tente novamente.");
        }
        return;
      }

      alert("Cadastro realizado com sucesso! 🐾");
      navigate("/login");

    } catch (error) {
      alert("Erro ao conectar ao servidor.");
      console.error(error);
    }
  }

  return (
    <FormBuilder
      title="Cadastro de Clientes"

      fields={[
        {
          name: "nome",
          label: "Nome completo",
          type: "text",
          placeholder: "Digite seu nome"
        },
        {
          name: "email",
          label: "E-mail (login)",
          type: "email",
          placeholder: "Digite seu e-mail"
        },
        {
          name: "senha",
          label: "Senha",
          type: "password",
          placeholder: "Digite sua senha"
        },
        {
          name: "confirmarSenha",
          label: "Confirme sua senha",
          type: "password",
          placeholder: "Confirme sua nova senha"
        }
      ]}

      extraHtml={
        <div className="instrucoes-senha">
           <p>
            Sua senha deve ter pelo menos <strong>6 caracteres</strong>, incluir <strong>1 letra maiúscula</strong>, 
            <strong>1 número</strong> e <strong>1 caractere especial</strong> permitido 
            (<code>@ # $ % & * ! ? / \ | - _ + . = *</code>). 
          </p>
					<p>
						Não são permitidos espaços nem os caracteres 
						{" "} 
						<code>{`{ } [ ] ^ : ; < > " ' ,`}</code>.
					</p>
        </div>
      }

      groups={[
        [
          {
            name: "cpf",
            label: "CPF",
            type: "text",
            placeholder: "Digite seu CPF"
          },
          {
            name: "nascimento",
            label: "Data de nascimento",
            type: "date"
          }
        ],
			]
    	}

			groups2={[
        [
          {
            name: "telefone",
            label: "Telefone celular / WhatsApp",
            type: "text",
            placeholder: "(00) 00000-0000"
          },
          {
            name: "escolaridade",
            label: "Escolaridade",
            type: "select",
						default: "2º grau completo", 
            options: [
              "1º grau incompleto",
              "1º grau completo",
              "2º grau completo",
              "Nível superior",
              "Pós-graduado"
            ]
          }
        ]
      ]}

      radioGroups={[
        {
          name: "estadoCivil",
          legend: "Estado civil",
          options: [
            { value: "solteiro", label: "Solteiro(a)", default: true },
            { value: "casado", label: "Casado(a)" },
            { value: "divorciado", label: "Divorciado(a)" },
            { value: "viuvo", label: "Viúvo(a)" }
          ]
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
          label: "Voltar para home",
          className: "btn-link btn-home",
          type: "button",
          onClick: () => navigate("/")
        }
      ]}

      onSubmit={enviarCadastro}
    />
  );
}
