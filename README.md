# Gerador de Textos para documentos oficiais - Node.js

Esse é um sistema criado a partir de inteligencia artificial, com o intuito de auxiliar pessoal do serviço publico na elaboração de textos oficiais.

## Setup

1. Se você não tiver o Node.js instalado, [instale-o daqui](https://nodejs.org/en/)

2. Clone o repositorio

3. Navegue até o diretorio do projeto

   ```bash
   $ cd gerador-texto-memorando
   ```

4. Instale os requisitos

   ```bash
   $ npm install
   ```

5. Faça uma cópia do arquivo de variáveis de ambiente de exemplo

   Systema Linux: 
   ```bash
   $ cp .env.example .env
   ```
   No Windows:
   ```powershell
   $ copy .env.example .env
   ```
6. Adicione api-keys ao arquivo .env que foi criado 

7. Execute o app

   ```
   bash
   $ npm run dev
   ```


Agora você deve conseguir acessar o aplicativo em [http://localhost:3000](http://localhost:3000)! 
