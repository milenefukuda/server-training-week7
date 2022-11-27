import express from "express";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

//habilitando a aplicação a ter variáveis de ambiente
dotenv.config();
//como acessar as variáveis de ambiente:
console.log(process.env.PORT);

//instanciando a variável que será responsável pelo nosso servidor: app
const app = express();

//configurar nosso servidor para que ele possa receber e enviar arquivos em json
app.use(express.json());

//banco de dados que usaremos de exemplo
const db = [];
/* 
    "nome": "karen okasaki", 
    "role": "professora",
    "tarefas": [],
    "endereço": {
        "cidade": "ribas do rio pardo",
        "estado": "MS"
    }
*/

//criação das rotas
//verbo http get
app.get("/", (req, res) => {
  // rota no insomnia: http://localhost:8080/

  //req é a REQUISIÇÃO -> é o pedido, vem do cliente
  // pelo req a gente pode acessar algumas informações como:
  console.log(req.url);
  console.log(req.method);

  // res é RESPONSE -> é o que o nosso servidor vai devolver para o cliente
  // retornar a resposta com o status de 200 e o json com a mensagem a seguir
  return res
    .status(200)
    .json({ messagem: "Bem vindo ao servidor da turma 91 - ENAP", data: db });
});

app.post("/create", (req, res) => {
  //visualizando o que o client enviou no corpo da requisição
  console.log(req.body);

  let form = { ...req.body, id: uuidv4() };

  db.push(form);

  return res.status(201).json({
    data: form,
    message: "Usuário criado!",
  });
});

app.get("/:id", (req, res) => {
  //acessando os parâmetro de busca enviado pelo client
  //os parametros são iguais os parâmetros de rotas do react. Eles podem ser acessados com descontrução também.
  // let id = req.params.id  OU
  const { id } = req.params;
  console.log(id);

  const user = db.find((user) => user.id === id);

  //caso o user não seja encontrando temos que fazer um if por excessão aqui.
  //e devolver uma resposta para o client
  if (!user) {
    return res.status(404).json({ message: "Usário não encontrado" });
  }

  return res.status(200).json(user);
});

app.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;

  const deleteById = db.find((user) => user.id === id);
  console.log(deleteById);

  const index = db.indexOf(deleteById);

  db.splice(index, 1);

  return res.status(200).json(db);
});

app.put("/editUser/:id", (req, res) => {
  const { id } = req.params;

  const user = db.find((user) => user.id === id);

  const index = db.indexOf(user);

  db[index] = {
    ...user,
    ...req.body,
  };

  return res.status(200).json(db[index]);
});

app.put("/addTarefa/:id", (req, res) => {
  const { id } = req.params;

  const user = db.find((user) => user.id === id);
  const index = db.indexOf(user);

  const update = db[index].tarefas.push(req.body.tarefa);

  return res.status(201).json(update);
});

app.listen(process.env.PORT, () => {
  console.log("App up and running on port: http://localhost:8080");
});
