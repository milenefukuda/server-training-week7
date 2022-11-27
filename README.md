# Bibliotecas

- express
- dotenv
- uuid

# Atividade n1º

## Iteração 0 - Server is live

> #### Configurar e subir o servidor

- Iniciar um projeto de servidor. **npm init -y**
- Configurar o arquivo package.json

  - Adicionar _"type": "module"_; -> sintax import export (ES6)
  - Adicionar o script "dev"; -> _"dev" : "nodemon index.js"_
  - Adicionar o script "start"; -> _"start": "node index.js"_

- Subir um servidor na porta 8080
- Adicionar a porta do servidor como uma variável de ambiente
- Configurar o servidor para receber e enviar arquivos em JSON

## Iteração 1 - Rotas

> #### O objetivo é criar rotas de um CRUD completo

|                                                | VERBO HTTP | ROTA            |
| ---------------------------------------------- | ---------- | --------------- |
| Acessar todos os processos                     | GET        | /all            |
| Criar processo                                 | POST       | /create         |
| Acesasr um processo pelo ID                    | GET        | /process/:id    |
| Editar processo                                | PUT        | /edit/:id       |
| Adicionar um comentário a array de comentários | PUT        | /addComment/:id |
| Deletar processo                               | DELETE     | /delete/:id     |
| Acessar todos processos em andamento           | GET        | /status/open    |
| Acessar todos processos finalizados            | GET        | /status/close   |

Exemplo de processo:

```
{
  id: e27ab2b1-cb91-4b18-ab90-5895cc9abd29,
  documentName: "Licitação Enap - Curso Web Dev",
  status: "Em andamento",
  details: "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack",
  dateInit: "28/11/2022",
  comments: ["Processo aberto", "Processo partiu para as partes assinarem", "Processo agora está em análise final", "Processo já tem data final"],
  dateEnd: "16/12/2022"
},
{
  id: ee5999d7-02e9-4b3d-a1ab-f067eef54173,
  documentName: "Licitação Compras - Notebooks",
  status: "Finalizado",
  details: "Processo de licitação para compra de notebooks",
  dateInit: "30/11/2022",
  comments: ["Processo em aberto e sem previsão de conclusão"],
  dateEnd: ""
},
```

### Iteração 2 - Treinando rotas

|                                                | VERBO HTTP | ROTA            |
| ---------------------------------------------- | ---------- | --------------- |
| Acessar um processo pelo ID                    | GET        | /process/:id    |
| Adicionar um comentário a array de comentários | PUT        | /addComment/:id |
| Acessar todos processos em andamento           | GET        | /status/open    |
| Acessar todos processos finalizados            | GET        | /status/close   |

#### Bônus

- Crie um rota que devolva um numero aleatório entre dois numeros passando como parâmetros.
  `Rota: "/random/:min/:max"`
  `exemplo: "/random/10/20" | response -> 15`
