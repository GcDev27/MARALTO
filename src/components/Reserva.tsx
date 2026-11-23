import { AnimatePresence, m } from 'motion/react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { endereco, horarios, telefone } from '../data/casa'
import './Reserva.css'

type Dados = {
  nome: string
  telefone: string
  data: string
  hora: string
  pessoas: string
  observacoes: string
}

type Erros = Partial<Record<keyof Dados, string>>

const vazio: Dados = { nome: '', telefone: '', data: '', hora: '', pessoas: '2', observacoes: '' }

const doisDigitos = (n: number) => String(n).padStart(2, '0')

function hojeISO() {
  const d = new Date()
  return `${d.getFullYear()}-${doisDigitos(d.getMonth() + 1)}-${doisDigitos(d.getDate())}`
}

function paraData(iso: string) {
  const [a, m, d] = iso.split('-').map(Number)
  return new Date(a, m - 1, d)
}

/* Horários de chegada a cada meia hora, até uma hora antes de a cozinha fechar. */
function horasDoDia(iso: string) {
  if (!iso) return []
  const dia = horarios[paraData(iso).getDay()]
  if (!dia) return []
  const turnos = [dia.almoco, dia.jantar].filter((t): t is [number, number] => Boolean(t))
  return turnos.flatMap(([inicio, fim]) => {
    const horas: string[] = []
    for (let h = inicio; h < fim - 1; h++) horas.push(`${h}:00`, `${h}:30`)
    horas.push(`${fim - 1}:00`)
    return horas
  })
}

function validar(d: Dados): Erros {
  const erros: Erros = {}
  if (d.nome.trim().length < 2) erros.nome = 'Escreva seu nome.'
  if (d.telefone.replace(/\D/g, '').length < 10)
    erros.telefone = 'Escreva o telefone com DDD, por exemplo (85) 98888-7777.'
  if (!d.data) erros.data = 'Escolha a data.'
  else if (d.data < hojeISO()) erros.data = 'Essa data já passou. Escolha hoje ou um dia depois.'
  else if (!horarios[paraData(d.data).getDay()])
    erros.data = 'Às segundas o restaurante fica fechado. Escolha outro dia.'
  if (!erros.data && !horasDoDia(d.data).includes(d.hora)) erros.hora = 'Escolha o horário.'
  return erros
}

const focar = (el: HTMLElement | null) => el?.focus()

const ordem: (keyof Dados)[] = ['nome', 'telefone', 'data', 'hora']

const formatoData = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

export function Reserva() {
  const [dados, setDados] = useState<Dados>(vazio)
  const [tentou, setTentou] = useState(false)
  const [enviado, setEnviado] = useState<Dados | null>(null)

  const erros = tentou ? validar(dados) : {}
  const horas = horasDoDia(dados.data)

  const mudar = (campo: keyof Dados) => (valor: string) =>
    setDados((atual) => {
      const novo = { ...atual, [campo]: valor }
      if (campo === 'data' && !horasDoDia(valor).includes(atual.hora)) novo.hora = ''
      return novo
    })

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    setTentou(true)
    const encontrados = validar(dados)
    const primeiro = ordem.find((campo) => encontrados[campo])
    if (primeiro) {
      document.getElementById(`reserva-${primeiro}`)?.focus()
      return
    }
    setEnviado(dados)
  }

  const recomecar = () => {
    setDados(vazio)
    setTentou(false)
    setEnviado(null)
  }

  const descricao = (campo: keyof Dados, dica?: string) => {
    const ids = [dica && `reserva-${campo}-dica`, erros[campo] && `reserva-${campo}-erro`]
    return ids.filter(Boolean).join(' ') || undefined
  }

  return (
    <section className="secao reserva" id="reserva" aria-labelledby="reserva-titulo">
      <div className="conteiner reserva-grade">
        <div className="reserva-lado">
          <span className="filete" aria-hidden="true" />
          <h2 id="reserva-titulo" className="secao-titulo">
            Reservar mesa
          </h2>
          <p className="secao-intro">
            Para grupos acima de 10 pessoas ou para o salão de eventos, ligue para {telefone}.
          </p>
          <dl className="reserva-info">
            <div>
              <dt>Onde</dt>
              <dd>{endereco}</dd>
            </div>
            <div>
              <dt>Jantar</dt>
              <dd>Terça a domingo, das 18h às 23h</dd>
            </div>
            <div>
              <dt>Almoço</dt>
              <dd>Sábado e domingo, das 12h às 16h</dd>
            </div>
            <div>
              <dt>Segunda</dt>
              <dd>Fechado</dd>
            </div>
          </dl>
        </div>

        <div className="reserva-caixa">
          <AnimatePresence mode="wait" initial={false}>
            {enviado ? (
              <m.div
                key="feito"
                className="reserva-feita"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* O foco vai para a confirmação quando ela aparece, para o leitor de tela anunciar. */}
                <h3 ref={focar} tabIndex={-1}>
                  Pedido de reserva anotado
                </h3>
                <p>
                  {enviado.nome.trim()}, mesa para {enviado.pessoas}{' '}
                  {enviado.pessoas === '1' ? 'pessoa' : 'pessoas'},{' '}
                  {formatoData.format(paraData(enviado.data))}, às {enviado.hora}.
                </p>
                <p className="reserva-aviso">
                  Num restaurante de verdade, a confirmação chegaria pelo WhatsApp. Como este é um
                  projeto acadêmico, nada foi enviado: os dados ficaram só no seu navegador.
                </p>
                <button type="button" className="botao botao-vazado" onClick={recomecar}>
                  Fazer outro pedido
                </button>
              </m.div>
            ) : (
              <m.form
                key="form"
                className="form"
                noValidate
                onSubmit={enviar}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Campo id="nome" rotulo="Nome" erro={erros.nome}>
                  <input
                    id="reserva-nome"
                    type="text"
                    autoComplete="name"
                    value={dados.nome}
                    aria-invalid={Boolean(erros.nome)}
                    aria-describedby={descricao('nome')}
                    onChange={(e) => mudar('nome')(e.target.value)}
                  />
                </Campo>

                <Campo
                  id="telefone"
                  rotulo="Telefone ou WhatsApp"
                  dica="Usamos só para confirmar a reserva."
                  erro={erros.telefone}
                >
                  <input
                    id="reserva-telefone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={dados.telefone}
                    aria-invalid={Boolean(erros.telefone)}
                    aria-describedby={descricao('telefone', 'dica')}
                    onChange={(e) => mudar('telefone')(e.target.value)}
                  />
                </Campo>

                <div className="form-dupla">
                  <Campo id="data" rotulo="Data" erro={erros.data}>
                    <input
                      id="reserva-data"
                      type="date"
                      min={hojeISO()}
                      value={dados.data}
                      aria-invalid={Boolean(erros.data)}
                      aria-describedby={descricao('data')}
                      onChange={(e) => mudar('data')(e.target.value)}
                    />
                  </Campo>

                  <Campo
                    id="hora"
                    rotulo="Horário"
                    dica={dados.data ? undefined : 'Escolha a data primeiro.'}
                    erro={erros.hora}
                  >
                    <select
                      id="reserva-hora"
                      value={dados.hora}
                      disabled={horas.length === 0}
                      aria-invalid={Boolean(erros.hora)}
                      aria-describedby={descricao('hora', dados.data ? undefined : 'dica')}
                      onChange={(e) => mudar('hora')(e.target.value)}
                    >
                      <option value="">{horas.length ? 'Escolha' : 'Sem horários'}</option>
                      {horas.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </Campo>
                </div>

                <Campo id="pessoas" rotulo="Pessoas">
                  <select
                    id="reserva-pessoas"
                    value={dados.pessoas}
                    onChange={(e) => mudar('pessoas')(e.target.value)}
                  >
                    {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </Campo>

                <Campo
                  id="observacoes"
                  rotulo="Observações (opcional)"
                  dica="Aniversário, alergia, cadeira para criança."
                >
                  <textarea
                    id="reserva-observacoes"
                    rows={3}
                    value={dados.observacoes}
                    aria-describedby={descricao('observacoes', 'dica')}
                    onChange={(e) => mudar('observacoes')(e.target.value)}
                  />
                </Campo>

                <button type="submit" className="botao form-enviar">
                  Pedir reserva
                </button>
              </m.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

type CampoProps = {
  id: keyof Dados
  rotulo: string
  dica?: string
  erro?: string
  children: ReactNode
}

function Campo({ id, rotulo, dica, erro, children }: CampoProps) {
  return (
    <div className={erro ? 'campo campo-erro' : 'campo'}>
      <label htmlFor={`reserva-${id}`}>{rotulo}</label>
      {dica && (
        <p id={`reserva-${id}-dica`} className="campo-dica">
          {dica}
        </p>
      )}
      {children}
      {erro && (
        <p id={`reserva-${id}-erro`} className="campo-mensagem">
          {erro}
        </p>
      )}
    </div>
  )
}
