import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [tipodocumentoInput, setTipodocumentoInput] = useState("");
  const [destinatarioInput, setDestinatarioInput] = useState("");
  const [acaoInput, setAcaoInput] = useState("");
  const [assuntoInput, setAssuntoInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipodocumento: tipodocumentoInput,
          destinatario: destinatarioInput,
          assunto: assuntoInput,
          acao: acaoInput,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      //setResult(data.result);
      document.getElementById("resultado").innerHTML = data.result;

      setTipodocumentoInput("");
      setDestinatarioInput("");
      setAssuntoInput("");
      setAcaoInput("");

    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Gerador de Textos</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>

        <div className={styles.cabecalho}>
          <div>
            <img src="" />
            <h3>Gerador de Textos</h3>
          </div>
        </div>
        
        <div className={styles.row}>
          <form onSubmit={onSubmit} className={styles.form}>
            <select
              id="tipodocumento"
              name="tipodocumento"
              value={tipodocumentoInput}
              onChange={(e) => setTipodocumentoInput(e.target.value)}>
              <option value="">Tipo do Documento</option>
              <option value="memorando">Memorando</option>
              <option value="oficio">Ofício</option>
              <option value="circular">Circular</option>
            </select>
            <select
              id="acao"
              name="acao"
              value={acaoInput}
              onChange={(e) => setAcaoInput(e.target.value)}>
              <option value="">Ação</option>
              <option value="informando">Informar</option>
              <option value="solicitando">Solicitar</option>
              <option value="requerendo">Requerer</option>
              <option value="em resposta a">Em resposta</option>
            </select>
            <input
              type="text"
              name="destinatario"
              placeholder="Nome do Destinatário"
              value={destinatarioInput}
              onChange={(e) => setDestinatarioInput(e.target.value)}
            />
            <textarea
              id="story"
              name="assunto"
              placeholder=""
              value={assuntoInput}
              onChange={(e) => setAssuntoInput(e.target.value)}
              rows="5" cols="33"
            >
            </textarea>
            <input type="submit" value="Gerar" />
          </form>
          <div className={styles.result} id="resultado">{result}</div>

        </div>

      </main>
    </div>
  );
}
