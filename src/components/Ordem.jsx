import './Ordem.css'

function Ordem({ ordem, aoAlternar, aoRemover }) {
  return (
    <li className={ordem.fgConcluida ? 'ordem concluida' : 'ordem'}>
      <div>
        <strong>{ordem.dsCliente}</strong> - {ordem.dsServico} - R$ {ordem.nuValor.toFixed(2)}
        {ordem.fgConcluida && <span className="selo">Concluída</span>}
      </div>
      <div className="acoes">
        <button onClick={() => aoAlternar(ordem.idOrdem)}>
          {ordem.fgConcluida ? 'Reabrir' : 'Concluir'}
        </button>
        <button onClick={() => aoRemover(ordem.idOrdem)}>Remover</button>
      </div>
    </li>
  )
}

export default Ordem