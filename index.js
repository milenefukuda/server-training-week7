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

// ITERAÇÃO 1
//criação das rotas
app.get("/all", (req, res) => {
  console.log(req.url);
  console.log(req.method);

  return res
    .status(200)
    .json({ messagem: "Bem vindo ao servidor da turma 91 - ENAP", data: db });
});

app.post("/create", (req, res) => {
  console.log(req.body);

  let form = { ...req.body, id: uuidv4() };

  db.push(form);

  return res.status(201).json({
    data: form,
    message: "Usuário criado!",
  });
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  const user = db.find((user) => user.id === id);

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
