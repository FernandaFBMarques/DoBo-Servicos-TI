export default function validarSenha(senha) {
    if (senha.length < 6) return false;
    if (!/[A-Z]/.test(senha)) return false;
    if (!/[0-9]/.test(senha)) return false;
    if (!/[@#$%&*!?/\\|\-+.=]/.test(senha)) return false;
    if (/\s/.test(senha)) return false;
  
    const proibidos = /[{}[\]^:;<>"',]/;
    if (proibidos.test(senha)) return false;
  
    return true;
  }
  