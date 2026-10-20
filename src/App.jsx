import { useState } from 'react'
import './App.css'
import Ordem from './components/Ordem'

const ordensIniciais = [
  { idOrdem: crypto.randomUUID(), dsCliente: 'Gustavo Guanabara', dsServico: 'Troca da Rodinha', nuValor: 100, fgConcluida: false },
  { idOrdem: crypto.randomUUID(), dsCliente: 'Luiz Sencoski', dsServico: 'Desentortar a Roda', nuValor: 80, fgConcluida: true },
  { idOrdem: crypto.randomUUID(), dsCliente: 'Luiz Henrique', dsServico: 'Rolamento Frouxo', nuValor: 50, fgConcluida: false },
]

function App() {
  const [ordens, setOrdens] = useState(ordensIniciais)
  const [form, setForm] = useState({ cliente: '', servico: '', valor: '' })
  const [erro, setErro] = useState('')

  const enviar = (evento) => {
    evento.preventDefault()

    const cliente = form.cliente.trim()
    const servico = form.servico.trim()
    const textoValor = form.valor.trim().replace(',', '.')

    if (cliente === '' || servico === '') {
      setErro('Preencha o cliente e o serviço.')
      return
    }

    // Number('') dá 0, valor zero é aceito assim como solicitado, fiado é fogo né kk
    const nuValor = Number(textoValor)
    if (textoValor === '' || !Number.isFinite(nuValor) || nuValor < 0) {
      setErro('Informe um valor numérico maior ou igual a 0.')
      return
    }

    const nova = {
      idOrdem: crypto.randomUUID(),
      dsCliente: cliente,
      dsServico: servico,
      nuValor,
      fgConcluida: false,
    }

    setOrdens([...ordens, nova])
    setForm({ cliente: '', servico: '', valor: '' })
    setErro('')
  }

  const alternar = (id) => {
    setOrdens(
      ordens.map((o) => (o.idOrdem === id ? { ...o, fgConcluida: !o.fgConcluida } : o))
    )
  }

  const remover = (id) => {
    setOrdens(ordens.filter((o) => o.idOrdem !== id))
  }

  // Resumo calculad sem useState
  const ordensAbertas = ordens.filter((o) => !o.fgConcluida)
  const totalOrdens = ordens.length
  const qtdeEmAberto = ordensAbertas.length
  const valorEmAberto = ordensAbertas.reduce((soma, o) => soma + o.nuValor, 0)

  return (
    <main className="app">
      <h1>Oficina de Bicicletamento</h1>

      <form onSubmit={enviar} className="form">
        <label>
          Nome do cliente
          <input
            value={form.cliente}
            onChange={(e) => setForm({ ...form, cliente: e.target.value })}
          />
        </label>
        <label>
          Serviço
          <input
            value={form.servico}
            onChange={(e) => setForm({ ...form, servico: e.target.value })}
          />
        </label>
        <label>
          Valor
          <input
            value={form.valor}
            onChange={(e) => setForm({ ...form, valor: e.target.value })}
          />
        </label>
        <button type="submit">Registrar</button>
        {erro && <p className="erro">{erro}</p>}
      </form>

      <section className="resumo">
        <div>Total de ordens: <strong>{totalOrdens}</strong></div>
        <div>Ordens em aberto: <strong>{qtdeEmAberto}</strong></div>
        <div>Valor em aberto: <strong>R$ {valorEmAberto.toFixed(2)}</strong></div>
      </section>

      <h2>Ordens</h2>
      {ordens.length === 0 ? (
        <p>Não há nenhuma ordem de serviço em aberto</p>
      ) : (
        <ul className="lista">
          {ordens.map((ordem) => (
            <Ordem
              key={ordem.idOrdem}
              ordem={ordem}
              aoAlternar={alternar}
              aoRemover={remover}
            />
          ))}
        </ul>
      )}
    </main>
  )
}

export default App