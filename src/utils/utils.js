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

export function configurarMenu() {
    const menu = document.getElementById("menu-links");
    const estaLogado = localStorage.getItem("usuarioLogado") === "true";
  
    if (estaLogado) {
      const linksParaRemover = menu.querySelectorAll(".link-header");
      linksParaRemover.forEach(link => {
        if (
          link.textContent.trim() === "Login" ||
          link.textContent.trim() === "Cadastrar"
        ) {
          link.remove();
        }
      });
  
      const servicosLink = document.createElement("a");
      servicosLink.href = "../carrinho/carrinho.html";
      servicosLink.className = "link-header";
      servicosLink.textContent = "Serviços de TI";
  
      const logoutLink = document.createElement("a");
      logoutLink.href = "#";
      logoutLink.className = "link-header";
      logoutLink.innerHTML = `<i class="fa-solid fa-right-from-bracket" title="Sair"></i>`;
  
      logoutLink.addEventListener("click", () => {
        const confirmar = confirm("Deseja sair da sua conta?");
        if (confirmar) {
          localStorage.removeItem("usuarioLogado");
          window.location.reload();
        }
      });
  
      menu.appendChild(servicosLink);
      menu.appendChild(logoutLink);
    }
  }
  

