import React, { useEffect, useState } from "react";
import "./Carrinho.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TabelaServico from "../../components/TabelaServico/TabelaServico";
import FormServico from "../../components/FormServico/FormServico";

export default function Carrinho() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [servicos, setServicos] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [form, setForm] = useState({
    servicoId: "",
    preco: "",
    prazo: "",
    dataPrevista: "",
    status: "Em elaboração",
  });

  useEffect(() => {
    async function carregarServicos() {
      const resp = await fetch("http://localhost:8000/servicos");
      const data = await resp.json();

      if (data.success) {
        setServicos(data.servicos);
      }
    }

    carregarServicos();
  }, []);

  useEffect(() => {
    async function carregarSolicitacoes() {
      if (!usuario?.login) return;
      if (servicos.length === 0) return;

      const resp = await fetch(
        `http://localhost:8000/solicitacoes/${usuario.login}`
      );

      const data = await resp.json();

      if (data.success) {
        const convertidas = data.solicitacoes.map((item) => {
          const serv = servicos.find((s) => s.id === item.servico_id);

          return {
            id: item.id,
            dataPedido: item.dataPedido,
            status: item.status,
            dataPrevista: item.dataPrevista,
            nomeServico: serv?.nome ?? "Desconhecido",
            preco: serv?.preco
              ? serv.preco.toFixed(2).replace(".", ",")
              : "0,00",
          };
        });

        setSolicitacoes(convertidas);
      }
    }

    carregarSolicitacoes();
  }, [usuario.login, servicos.length]);

  function onSelecionarServico(id) {
    const servico = servicos.find((s) => s.id === Number(id));
    if (!servico) return;

    const hoje = new Date();
    const dataPrev = new Date(hoje);
    dataPrev.setDate(hoje.getDate() + servico.prazo);

    setForm({
      servicoId: servico.id,
      preco: servico.preco.toFixed(2).replace(".", ","),
      prazo: servico.prazo,
      dataPrevista: dataPrev.toLocaleDateString("pt-BR"),
      status: "Em elaboração",
    });
  }

	async function incluirSolicitacao() {
		if (!form.servicoId) {
			alert("Selecione um serviço antes de incluir.");
			return;
		}
	
		const nova = {
			servico_id: Number(form.servicoId),
			status: "Em elaboração",
			dataPedido: new Date().toISOString().slice(0, 10),
			dataPrevista: form.dataPrevista.split("/").reverse().join("-")
		};
	
		const listaParaEnviar = solicitacoes.map((s) => ({
			servico_id: servicos.find((x) => x.nome === s.nomeServico)?.id,
			status: s.status,
			dataPedido: s.dataPedido.split("/").reverse().join("-"),
			dataPrevista: s.dataPrevista.split("/").reverse().join("-"),
		}));
	
		listaParaEnviar.push(nova);
	
		try {
			const resp = await fetch(
				`http://localhost:8000/solicitacoes/${usuario.login}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(listaParaEnviar)
				}
			);
	
			const data = await resp.json();
	
			if (!resp.ok) {
				alert(data.mensagem || "Erro ao enviar solicitação.");
				return;
			}
	
			alert("Solicitação incluída com sucesso!");
	
			//window.location.reload();
	
		} catch (erro) {
			console.error(erro);
			alert("Erro ao incluir solicitação.");
		}
	}
	

  async function removerSolicitacao(id) {
    const confirmar = window.confirm("Tem certeza que deseja excluir?");
    if (!confirmar) return;

    try {
      await fetch(`http://localhost:8000/solicitacoes/${id}`, {
        method: "DELETE",
      });

      setSolicitacoes((prev) => prev.filter((s) => s.id !== id));
    } catch (erro) {
      console.error("Erro ao excluir:", erro);
      alert("Erro ao excluir solicitação.");
    }
  }

  return (
    <main className="carrinho-main">
      <section className="usuario-info">
        <p className="usuario-nome">Bem-vindo(a), <strong>{usuario.nome} 🐾</strong></p>
        <p className="usuario-login">Login: <span>{usuario.login}</span></p>
      </section>

      <section className="tabela-solicitacoes">
        <h2>🐾 Solicitações de TI 🐶</h2>

        <TabelaServico
					columns={[
						{ key: "dataPedido", label: "Data do Pedido" },
						{ key: "id", label: "Nº Solicitação" },
						{ key: "nomeServico", label: "Serviço" },
						{ key: "status", label: "Status" },
						{ key: "preco", label: "Preço" },
						{ key: "dataPrevista", label: "Data Prevista" },
					]}
					data={solicitacoes}
					actions={[
						{
							icon: <FontAwesomeIcon icon={faTrash}/>,
							onClick: (row) => removerSolicitacao(row.id),
						},
					]}
				/>				
        <button onClick={() => window.location.reload()}>Atualizar lista</button> 

      </section>

      <section className="nova-solicitacao">
        <h2>🐾 Nova Solicitação de Serviço 🐶</h2>

        <FormServico
					buttonText="Incluir Solicitação"
					onSubmit={incluirSolicitacao}
					fields={[
						{
							label: "Serviço de TI",
							name: "servicoId",
							type: "select",
							value: form.servicoId,
							options: servicos.map((s) => ({ value: s.id, label: s.nome })),
							onChange: (v) => onSelecionarServico(v),
						},
						{
							label: "Preço",
							name: "preco",
							type: "text",
							value: form.preco ? `R$ ${form.preco}` : "R$ 0,00",
							readOnly: true,
						},
						{
							label: "Prazo (dias)",
							name: "prazo",
							type: "text",
							value: form.prazo || "--",
							readOnly: true,
						},
						{
							label: "Data Prevista",
							name: "dataPrevista",
							type: "text",
							value: form.dataPrevista || "--/--/----",
							readOnly: true,
						},
					]}
				/>

      </section>
    </main>
  );
}
