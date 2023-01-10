import Head from "next/head";
import { useState } from "react";
//import styles from "./index.module.css";
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {
  const [tipodocumentoInput, setTipodocumentoInput] = useState("");
  const [destinatarioInput, setDestinatarioInput] = useState("");
  const [acaoInput, setAcaoInput] = useState("");
  const [assuntoInput, setAssuntoInput] = useState("");
  const [textoResultadoInput, setTextoResultadoInput] = useState("");
  //const [result, setResult] = useState();

  function disabledSubmit(disabled, statusTexto){
    document.querySelector('#gerar').disabled = disabled;
    document.querySelector('#gerar').value = statusTexto;
  }

  async function onSubmit(event) {
    event.preventDefault();
    disabledSubmit(true, "Aguarde...");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipodocumento: tipodocumentoInput,
          acao: acaoInput,
          destinatario: destinatarioInput,
          assunto: assuntoInput
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        console.log(response);
        throw data.error || new Error(`Request failed with status ${response.status}`);
        
      }
      disabledSubmit(false, "Gerar");
      setTipodocumentoInput("");
      setDestinatarioInput("");
      setAssuntoInput("");
      setAcaoInput("");
      setTextoResultadoInput(data.result);
      console.time()
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      disabledSubmit(false, "Gerar");

    }
  }

  return (
    <div>
      <Head>
        <title>GT Tools</title>
        <link rel="icon" href="/digitando.png" />
      </Head>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src="/digitando.png" alt="" height="24" class="d-inline-block align-text-top" />
          </a>
          <a class="navbar-brand" href="#">GTI</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Início</a>
              </li>

            </ul>
            {/*<span class="navbar-text">
              <a href="mailto:arthur.desenvolvedor@gmail.com">Contato: arthur.desenvolvedor@gmail.com</a>
</span>*/}
          </div>
        </div>
      </nav>
      <main>
        <div class="container mt-5">
          <h3 class="text-center mb-1">Gere textos inteligentes!</h3>
          <p class="text-center mb-4">Textos para documentos oficiais.</p>
          <div class="row">
            <div class="col-md-6 mb-3">
              <form onSubmit={onSubmit}>
                <div class="row mb-3">
                  <div class="col">
                    <select class="form-select" aria-label="Campo para selecionar o tipo de documento"
                      id="tipodocumento"
                      name="tipodocumento"
                      value={tipodocumentoInput}
                      onChange={(e) => setTipodocumentoInput(e.target.value)}>
                      <option value="">Tipo do Documento</option>
                      <option value="memorando">Memorando</option>
                      <option value="oficio">Ofício</option>
                      <option value="circular">Circular</option>
                    </select>
                  </div>
                  <div class="col">
                    <select class="form-select" aria-label="Campo para selecionar o tipo de documento"
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
                  </div>
                </div>
                <div class="mb-3">
                  <input
                    id="destinatario"
                    class="form-control"
                    type="text"
                    name="destinatario"
                    placeholder="Nome do Destinatário"
                    value={destinatarioInput}
                    onChange={(e) => setDestinatarioInput(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <textarea
                    class="form-control"
                    id="assunto"
                    name="assunto"
                    placeholder="Exemplo: Contratação de João Gomes para o setor x"
                    value={assuntoInput}
                    onChange={(e) => setAssuntoInput(e.target.value)}
                    rows="5" cols="33"
                  >
                  </textarea>
                </div>
                <input type="submit" value="Gerar" class="btn btn-success" id="gerar" />
              </form>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <textarea
                  class="form-control"
                  id="textoResultado" rows="14"
                  placeholder="Seu texto será exibido aqui"
                  value={textoResultadoInput}
                  onChange={(e) => setTextoResultadoInput(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <footer class="container">
          <p class="float-end">version 1.0</p>
          <p><a href="maito:arthur.desenvolvedor@gmail.com">arthur.desenvolvedor@gmail.com</a></p>
        </footer>
      </main>

    </div>
  );
}
