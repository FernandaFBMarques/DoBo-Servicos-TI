import {
    mostrarErro,
    limparErro,
    validarEmail,
    validarSenha,
    marcarCamposTocados,
  } from "../utils/utils.js";
  
  const form = document.querySelector("form");
  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const confirmaSenhaInput = document.getElementById("confirma-senha");
  const cpfInput = document.getElementById("cpf");
  const nascimentoInput = document.getElementById("nascimento");
  const telefoneInput = document.getElementById("telefone");
  const btnLimpar = document.querySelector(".btn-limpar");
  const btnHome = document.querySelector(".btn-home");
  const inputs = document.querySelectorAll("input");
 
  function validarNome(nome) {
    if (!nome.trim()) return false;
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
  
  cpfInput.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "").slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = valor;
  });
  
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
    if (!tel.trim()) return true;
    const padrao = /^\(\d{2}\)\s?\d{5}-\d{4}$/;
    return padrao.test(tel);
  }
  
  telefoneInput.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d{4})$/, "$1-$2");
    e.target.value = v;
  });
  
 
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;
    marcarCamposTocados(inputs);
  
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();
    const confirmaSenha = confirmaSenhaInput.value.trim();
    const cpf = cpfInput.value.trim();
    const nascimento = nascimentoInput.value;
    const telefone = telefoneInput.value.trim();
  
    if (!validarNome(nome)) {
      mostrarErro(
        nomeInput,
        "Informe o nome completo (duas palavras, sem caracteres especiais)."
      );
      valido = false;
    } else {
      limparErro(nomeInput);
    }
  
    if (!email) {
      mostrarErro(emailInput, "O e-mail é obrigatório.");
      valido = false;
    } else if (!validarEmail(email)) {
      mostrarErro(emailInput, "Digite um e-mail válido (ex: pet@dobo.com).");
      valido = false;
    } else {
      limparErro(emailInput);
    }
  
    if (!senha) {
      mostrarErro(senhaInput, "A senha é obrigatória.");
      valido = false;
    } else if (!validarSenha(senha)) {
      mostrarErro(
        senhaInput,
        "Senha inválida. Deve ter 6+ caracteres, 1 maiúscula, 1 número e 1 símbolo permitido."
      );
      valido = false;
    } else {
      limparErro(senhaInput);
    }
  
    if (!confirmaSenha) {
      mostrarErro(confirmaSenhaInput, "Confirme sua senha.");
      valido = false;
    } else if (confirmaSenha !== senha) {
      mostrarErro(confirmaSenhaInput, "As senhas não coincidem.");
      valido = false;
    } else {
      limparErro(confirmaSenhaInput);
    }
  
    if (!cpf) {
      mostrarErro(cpfInput, "O CPF é obrigatório.");
      valido = false;
    } else if (!validarCPF(cpf)) {
      mostrarErro(cpfInput, "CPF inválido. Verifique os números digitados.");
      valido = false;
    } else {
      limparErro(cpfInput);
    }
  
    if (!validarNascimento(nascimento)) {
      mostrarErro(
        nascimentoInput,
        "Data de nascimento inválida. É necessário ter 18 anos ou mais."
      );
      valido = false;
    } else {
      limparErro(nascimentoInput);
    }
  
    if (!validarTelefone(telefone)) {
      mostrarErro(telefoneInput, "Telefone deve estar no formato (00) 00000-0000.");
      valido = false;
    } else {
      limparErro(telefoneInput);
    }
  
    if (valido) {
			limparErro(senhaInput)
			limparErro(emailInput)
			limparErro(confirmaSenha)
			limparErro()
			setTimeout(() => {
					alert("Cadastro realizado com sucesso! 🐾 🐾");
					window.location.href = "../login/login.html";
			}, 50);
      
    }
  });
  
	btnLimpar.addEventListener("click", (e) => {
		e.preventDefault(); 
	
		form.reset();
	
		inputs.forEach((input) => {
			limparErro(input);
			input.classList.remove("tocado");
		});
	
		setTimeout(() => { //nao funfa
			form.scrollIntoView({ behavior: "smooth", block: "start" });
		}, 100);
	
		setTimeout(() => { //nao fnfa 
			nomeInput.focus();
		}, 400);
	});
	
	
  
  btnHome.addEventListener("click", () => {
    window.location.href = "../home/home.html";
  });
  