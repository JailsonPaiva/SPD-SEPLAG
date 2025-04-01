# Sistema de Pessoas Desaparecidas - SPD

Este projeto é um sistema para gerenciar informações sobre pessoas desaparecidas. Ele permite que os usuários visualizem, filtrem e enviem informações sobre casos de desaparecimento.

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Angular CLI](https://angular.io/cli) (instalado globalmente)
- [Docker](https://www.docker.com/get-started)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/JailsonPaiva/SPD-SEPLAG.git
   cd SPD-SEPLAG
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

## Executando a Aplicação

Para rodar a aplicação em modo de desenvolvimento, use o seguinte comando:

```bash
ng serve
```

A aplicação estará disponível em `http://localhost:4200/`.

## Executando os Testes

Para rodar os testes unitários, utilize o seguinte comando:

```bash
ng test
```

## Gerando a Imagem Docker

Para criar uma imagem Docker para a aplicação, siga os passos abaixo:

1. Certifique-se de que você está na raiz do projeto.
2. Verifique o arquivo `Dockerfile` existe, senão crie ele com o seguinte conteúdo:

   ```dockerfile
   # Usar a imagem base do Node.js
   FROM node:18

   # Definir o diretório de trabalho
   WORKDIR /app

   # Copiar os arquivos do projeto
   COPY package*.json ./
   RUN npm install
   COPY . .

   # Construir a aplicação
   RUN npm run build

   # Expor a porta que a aplicação irá rodar
   EXPOSE 4200

   # Comando para iniciar a aplicação
   CMD ["npm", "start"]
   ```

3. Execute o seguinte comando para construir a imagem:

   ```bash
   docker build -t pessoas-desaparecidas .
   ```

## Rodando o Container Docker

Para rodar o container a partir da imagem que você criou, use o seguinte comando:

```bash
docker run -p 4200:4200 pessoas-desaparecidas
```

A aplicação estará disponível em `http://localhost:4200/`.

## Contribuição

Se você deseja contribuir para este projeto, sinta-se à vontade para abrir um pull request ou relatar problemas.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).