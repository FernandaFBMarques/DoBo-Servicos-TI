import React, { useState } from "react";
import "./FormUser.css";

export default function FormBuilder({
  title,
  fields = [],
  groups = [],
  groups2 = [],
  radioGroups = [],
  extraHtml = null,
  extraButtons = [],
  onSubmit
}) {
  const [values, setValues] = useState({});
  const [erros, setErros] = useState({});

  function handleChange(e) {
    let { name, value } = e.target;

    if (name === "cpf") {
      value = value.replace(/\D/g, "").slice(0, 11);
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    if (name === "telefone") {
      value = value.replace(/\D/g, "").slice(0, 11);
      value = value.replace(/^(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{5})(\d{4})$/, "$1-$2");
    }

    setValues({ ...values, [name]: value });
  }

  function enviar(e) {
    e.preventDefault();
    onSubmit(values, setErros);
  }

  return (
      <section className="form-container">

        <h2>{title}</h2>

        <form onSubmit={enviar} noValidate>
          
          {fields.map((f) => (
            <div key={f.name} className="campo">
              <label htmlFor={f.name}>{f.label}</label>

              {f.type === "select" ? (
                <select
                  id={f.name}
                  name={f.name}
                  value={values[f.name] || ""}
                  onChange={handleChange}
                >
                  {f.options.map((op) => (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  placeholder={f.placeholder || ""}
                  value={values[f.name] || ""}
                  onChange={handleChange}
                />
              )}

              <small className="erro">{erros[f.name] || ""}</small>
            </div>
          ))}

        {extraHtml} 

          {groups.map((g, i) => (
            <div className="linha-campo-duplo" key={i}>
              {g.map((f) => (
                <div key={f.name} className="campo">
                  <label htmlFor={f.name}>{f.label}</label>

                  {f.type === "select" ? (
                    <select
                      id={f.name}
                      name={f.name}
                      value={values[f.name] || ""}
                      onChange={handleChange}
                    >
                      {f.options.map((op) => (
                        <option key={op} value={op}>{op}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder || ""}
                      value={values[f.name] || ""}
                      onChange={handleChange}
                    />
                  )}

                  <small className="erro">{erros[f.name] || ""}</small>
                </div>
              ))}
            </div>
          ))}

          {radioGroups.map((rg) => (
            <fieldset className="estado-civil" key={rg.name}>
              <legend>{rg.legend}</legend>
              {rg.options.map((op) => (
                <label className="opcao-estado" key={op.value}>
                  <input
                    type="radio"
                    name={rg.name}
                    value={op.value}
                    defaultChecked={op.default}
                    onChange={(e) =>
                      setValues({ ...values, [rg.name]: e.target.value })
                    }
                  />
                  {op.label}
                </label>
              ))}
            </fieldset>
          ))}

        {groups2.map((g, i) => (
            <div className="linha-campo-duplo" key={i}>
              {g.map((f) => (
                <div key={f.name} className="campo">
                  <label htmlFor={f.name}>{f.label}</label>

                  {f.type === "select" ? (
                    <select
                      id={f.name}
                      name={f.name}
                      value={values[f.name] ?? f.default ?? ""}
                      onChange={handleChange}
                    >
                      {f.options.map((op) => (
                        <option key={op} value={op}>{op}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder || ""}
                      value={values[f.name] || ""}
                      onChange={handleChange}
                    />
                  )}

                  <small className="erro">{erros[f.name] || ""}</small>
                </div>
              ))}
            </div>
          ))}

          <div className="acoes-form">
            {extraButtons.map((b, i) => (
              <button
                key={i}
                type={b.type}
                className={b.className}
                onClick={(e) => b.onClick?.(e)}
              >
                {b.label}
              </button>
            ))}
          </div>

          <button type="submit" className="btn-submit">
            Confirmar
          </button>
        </form>
      </section>
  );
}
