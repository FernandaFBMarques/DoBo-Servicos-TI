import "./FormServico.css";

import React from "react";

export default function FormServico({
  fields = [],
  buttonText,
  onSubmit,
}) {
  return (
      <form onSubmit={(e) => e.preventDefault()}>

        {fields.reduce((rows, field, i) => {
          if (i % 2 === 0) rows.push([field]);
          else rows[rows.length - 1].push(field);
          return rows;
        }, []).map((par, index) => (
          <div className="linha-campo-duplo" key={index}>
            {par.map((field) => (
              <div className="campo" key={field.name}>
                <label>{field.label}</label>

                {field.type === "select" ? (
                  <select
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={field.value}
                    readOnly={field.readOnly}
                    onChange={(e) =>
                      field.onChange && field.onChange(e.target.value)
                    }
                  />
                )}
              </div>
            ))}
          </div>
        ))}

        <button type="button" className="button" onClick={onSubmit}>
          {buttonText}
        </button>
      </form>
  );
}

  