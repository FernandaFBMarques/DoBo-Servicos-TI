import React, { useCallback, useState } from "react";
import "../Carrinho/Carrinho.css";
import TabelaServico from "../../components/TabelaServico/TabelaServico";
import FormServico from "../../components/FormServico/FormServico";


export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    preco: "",
    prazo: "",
  });

  const fetchServicos = useCallback(async () => {
    try {
      const resp = await fetch("http://localhost:8000/servicos");
      const data = await resp.json();

      if (data.success) {
        setServicos(data.servicos);
      }
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    }
  }, []);

  if (!loaded) {
    setLoaded(true);
    fetchServicos();
  }

  async function cadastrarServico() {
    if (!form.nome || !form.preco || !form.prazo) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoServico = {
      nome: form.nome,
      preco: Number(form.preco),
      prazo: Number(form.prazo),
    };

    try {
      const resp = await fetch("http://localhost:8000/servicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoServico),
      });

      const data = await resp.json();

      if (!resp.ok) {
        alert(data.mensagem || "Erro ao cadastrar serviço.");
        return;
      }

      alert("Serviço cadastrado com sucesso!");

      setForm({ nome: "", preco: "", prazo: "" });


    } catch (erro) {
      console.error("Erro no cadastro:", erro);
      alert("Erro ao cadastrar serviço.");
    }
  }

  return (
    <main className="carrinho-main">
      <section className="tabela-solicitacoes" style={{ marginTop: "40px" }}>

      <h2> Serviço de TI </h2>
      <TabelaServico
        columns={[
          { key: "id", label: "ID" },
          { key: "nome", label: "Serviço" },
          { key: "preco", label: "Preço (R$)" },
          { key: "prazo", label: "Prazo (dias)" },
        ]}
        data={servicos.map((s) => ({
          id: s.id,
          nome: s.nome,
          preco: s.preco.toFixed(2).replace(".", ","),
          prazo: s.prazo,
        }))}
      />
      <button onClick={fetchServicos}>Atualizar lista</button>

      </section>
      <section className="tabela-solicitacoes" > 
        <h2> Novo serviço de TI </h2>
        <FormServico
          buttonText="Cadastrar Serviço"
          onSubmit={cadastrarServico}
          fields={[
            {
              label: "Nome do Serviço",
              name: "nome",
              type: "text",
              value: form.nome,
              onChange: (v) => setForm({ ...form, nome: v }),
            },
            {
              label: "Preço (R$)",
              name: "preco",
              type: "number",
              value: form.preco,
              onChange: (v) => setForm({ ...form, preco: v }),
            },
            {
              label: "Prazo (dias)",
              name: "prazo",
              type: "number",
              value: form.prazo,
              onChange: (v) => setForm({ ...form, prazo: v }),
            },
          ]}
      />
      </section>
      
    </main>
  );
}
