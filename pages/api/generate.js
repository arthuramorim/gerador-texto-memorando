import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "A chave da API não foi configurada corretamente",
      }
    });
    return;
  }

  const {tipodocumento = '', acao = '', destinatario = '', assunto = '' } = req.body;
  
  const camposPreenchidos = [tipodocumento, acao, destinatario, assunto];
  const camposTratados = camposPreenchidos.every(campo => campo.trim().length > 0);

  

  if (!camposTratados) {
    res.status(422).json({
      error: {
        message: "Todos os campos precisam ser preenchidos!",
      }
    });
    return;
  }

  
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(camposPreenchidos),
      temperature: 0,
      max_tokens: 2878,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,


    });
    
    //const texto = completion.data.choices[0].text
    //texto = texto.replace(/\n/g, '<br>');
    res.status(200).json({ result: completion.data.choices[0].text});
    
    console.log(completion.data);
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(campos) {
  //[tipodocumento, acao, destinatario, assunto];

  const tipodocumento = campos[0];
  const acao = campos[1];
  const destinatario = campos[2];
  const assunto = campos[3];

  
  //const capitalizedAnimal =
    //animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Crie um texto no formato de ${tipodocumento} para ${destinatario}, ${acao} ${assunto}. Sou da prefeitura de Feira de Santana-BA`;

}
