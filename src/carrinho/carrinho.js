const solicitacoesBackend = [
    {
      dataPedido: "01/10/2025",
      numero: "001",
      servico: "Backup na Nuvem",
      status: "Concluído",
      preco: "R$ 1250,00",
      dataPrevista: "05/10/2025"
    },
    {
      dataPedido: "04/10/2025",
      numero: "002",
      servico: "Segurança de Rede",
      status: "Em andamento",
      preco: "R$ 4400,00",
      dataPrevista: "10/10/2025"
    },
    {
      dataPedido: "10/10/2025",
      numero: "003",
      servico: "Data Analytics",
      status: "Em elaboração",
      preco: "R$ 3600,00",
      dataPrevista: "17/10/2025"
    }
  ];
  
  const tabelaCorpo = document.querySelector("tbody");
  const botaoIncluir = document.querySelector(".button");
  const servicoSelect = document.getElementById("servico");
  const precoInput = document.getElementById("preco");
  const prazoInput = document.getElementById("prazo");
  const dataPrevistaInput = document.getElementById("data-prevista");
  const statusInput = document.getElementById("status");
  
  const servicos = {
    backup: { nome: "Backup na Nuvem", preco: 1250, prazo: 5 },
    seguranca: { nome: "Segurança de Rede", preco: 4400, prazo: 13 },
    suporte: { nome: "Suporte Técnico", preco: 800, prazo: 10 },
    data: { nome: "Data Analytics", preco: 3600, prazo:30 },
    monitoramento: { nome: "Monitoramento de Sistemas", preco: 970, prazo: 10 }
  };

  function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
  
  function calcularDataPrevista(dias) {
    const hoje = new Date();
    hoje.setDate(hoje.getDate() + dias);
    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
  
  function renderizarTabela() {
    tabelaCorpo.innerHTML = "";
  
    solicitacoesBackend.forEach((item, index) => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${item.dataPedido}</td>
        <td>${item.numero}</td>
        <td>${item.servico}</td>
        <td>${item.status}</td>
        <td>${item.preco}</td>
        <td>${item.dataPrevista}</td>
        <td>
          <button class="btn-excluir" data-index="${index}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      `;
      tabelaCorpo.appendChild(linha);
    });
  }
  
  servicoSelect.addEventListener("change", () => {
    const servicoSelecionado = servicoSelect.value;
    if (servicos[servicoSelecionado]) {
      const { preco, prazo } = servicos[servicoSelecionado];
      precoInput.value = formatarPreco(preco);
      prazoInput.value = `${prazo} dias`;
      dataPrevistaInput.value = calcularDataPrevista(prazo);
      statusInput.value = "Em elaboração";
    } else {
      precoInput.value = "R$ 0,00";
      prazoInput.value = "--";
      dataPrevistaInput.value = "--/--/----";
      statusInput.value = "Em elaboração";
    }
  });
  
  botaoIncluir.addEventListener("click", () => {
    const servicoSelecionado = servicoSelect.value;
  
    if (!servicoSelecionado) {
      alert("Por favor, selecione um serviço antes de incluir.");
      return;
    }
  
    const { nome } = servicos[servicoSelecionado];
    const numero = String(3 + 1).padStart(3, "0");// valor de quantidade de dados no backend hardcoded
    const dataPedido = new Date().toLocaleDateString("pt-BR");
  
    const novaSolicitacao = {
      dataPedido,
      numero,
      servico: nome,
      status: "Em elaboração",
      preco: precoInput.value,
      dataPrevista: dataPrevistaInput.value
    };
  
    solicitacoesBackend.push(novaSolicitacao);
    renderizarTabela();
  
    servicoSelect.value = "";
    precoInput.value = "R$ 0,00";
    prazoInput.value = "--";
    dataPrevistaInput.value = "--/--/----";
  });
  
  tabelaCorpo.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-excluir");
    if (botao) {
      const index = botao.dataset.index;
  
      const confirmar = confirm("Tem certeza que deseja excluir esta solicitação?");
      if (confirmar) {
        solicitacoesBackend.splice(index, 1);
        renderizarTabela();
      }
    }
  });
  
  renderizarTabela();

  