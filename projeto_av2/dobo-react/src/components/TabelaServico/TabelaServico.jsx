import "./TabelaServico.css";

export default function TabelaServico({ columns, data, actions }) {
    return (
        <table>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>{col.label}</th>
              ))}
  
              {actions && <th>Ações</th>}
            </tr>
          </thead>
  
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)}>
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id}>
                  {columns.map((col, i) => (
                    <td key={i}>{row[col.key]}</td>
                  ))}
  
                  {actions && (
                    <td>
                      {actions.map((action, i) => (
                        <button
                          key={i}
                          className="btn-excluir"
                          onClick={() => action.onClick(row)}
                        >
                          {action.icon}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
    );
  }
  