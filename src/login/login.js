import {
  mostrarErro,
  limparErro,
  validarEmail,
  validarSenha,
} from "../utils/utils.js";

const form = document.getElementById("form-login");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha")
const inputs = document.querySelectorAll("input");
const btnLimpar = document.querySelector(".btn-limpar");
const btnRecuperar = document.querySelector(".btn-recuperar");

form.addEventListener("submit", (e) => {
  e.preventDefault(); 

	inputs.forEach((input) => input.classList.add("tocado")); 

  const email = emailInput.value.trim();
	const senha = senhaInput.value.trim();
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

	if (senha === ""){
		mostrarErro(senhaInput, "A Senha é obrigatória")
	}else if (!validarSenha(senha)){
		mostrarErro(
      senhaInput,
      "Sua senha deve ter pelo menos 6 caracteres, incluir 1 letra maiúscula, 1 número e 1 caractere especial permitido (@ # $ % & * ! ? / \\ | - _ + . =)."
		)
			valido = false;
  } else {
    limparErro(senhaInput);
  }

  if (valido) {
		limparErro(senhaInput)
		limparErro(emailInput)
		localStorage.setItem("usuarioLogado", "true");
    setTimeout(() => {
			alert("Login realizado com sucesso! 🐾");

			window.location.href = "../carrinho/carrinho.html";
		}, 50);
  }

});

btnLimpar.addEventListener("click", () => {
  form.reset();
  inputs.forEach((input) => {
    limparErro(input);
    input.classList.remove("tocado");
  });
  emailInput.focus(); // foco volta pro campo de e-mail
});

btnRecuperar.addEventListener("click", () => {
	window.location.href = "../login/recuperar-senha.html";
});

window.addEventListener("DOMContentLoaded", () => {
  emailInput.focus();
});

