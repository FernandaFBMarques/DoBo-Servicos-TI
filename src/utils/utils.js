export function mostrarErro(input, mensagem) {
	const campo = input.parentElement;
	const small = campo.querySelector(".erro");
	small.textContent = mensagem;
	small.style.color = "var(--vermelho)";
}

export function limparErro(input) {
	const campo = input.parentElement;
	const small = campo.querySelector(".erro");
	small.textContent = "";
}

export function validarEmail(email) {
	const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return padraoEmail.test(email);
}

export function validarSenha(senha) {
	const padraoSenha = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!?/\\|_\-+=.])[A-Za-z\d@#$%&*!?/\\|_\-+=.]{6,}$/;
	return padraoSenha.test(senha);
}

export function marcarCamposTocados(inputs) {
	inputs.forEach((input) => input.classList.add("tocado"));
}

