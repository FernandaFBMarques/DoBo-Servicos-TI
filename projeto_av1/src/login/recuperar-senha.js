import {
    mostrarErro,
    limparErro,
    validarEmail,
    validarSenha,
    marcarCamposTocados,
  } from "../utils/utils.js";
  
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const novaSenhaInput = document.getElementById("nova-senha");
  const confirmaSenhaInput = document.getElementById("confirma-senha");
  const inputs = document.querySelectorAll("input");
  
  const btnLimpar = document.querySelector(".btn-limpar");
  const btnLogin = document.querySelector(".btn-login");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    marcarCamposTocados(inputs);
  
    const email = emailInput.value.trim();
    const novaSenha = novaSenhaInput.value.trim();
    const confirmaSenha = confirmaSenhaInput.value.trim();
    let valido = true;
  
    if (email === "") {
      mostrarErro(emailInput, "O e-mail é obrigatório.");
      valido = false;
    } else if (!validarEmail(email)) {
      mostrarErro(emailInput, "Digite um e-mail válido (ex: pet@dobo.com).");
      valido = false;
    } else {
      limparErro(emailInput);
    }
  
    if (novaSenha === "") {
      mostrarErro(novaSenhaInput, "A nova senha é obrigatória.");
      valido = false;
    } else if (!validarSenha(novaSenha)) {
      mostrarErro(
        novaSenhaInput,
        "A senha deve ter pelo menos 6 caracteres, incluir 1 letra maiúscula, 1 número e 1 caractere especial permitido (@ # $ % & * ! ? / \\ | - _ + . =)."
      );
      valido = false;
    } else {
      limparErro(novaSenhaInput);
    }
  
    if (confirmaSenha === "") {
      mostrarErro(confirmaSenhaInput, "Por favor, confirme sua nova senha.");
      valido = false;
    } else if (confirmaSenha !== novaSenha) {
      mostrarErro(confirmaSenhaInput, "As senhas não coincidem.");
      valido = false;
    } else {
      limparErro(confirmaSenhaInput);
    }
  
    if (valido) {
			limparErro(novaSenha)
			limparErro(confirmaSenha)
			limparErro(emailInput)
			setTimeout(() => {
				alert("Senha redefinida com sucesso! 🐾");
				window.location.href = "../login/login.html";
			}, 50);
		}
  });
  
btnLimpar.addEventListener("click", () => {
	form.reset();
	inputs.forEach((input) => {
		limparErro(input);
		input.classList.remove("tocado");
	});
	emailInput.focus(); 
});
  
  btnLogin.addEventListener("click", () => {
    window.location.href = "../login/login.html";
  });
  