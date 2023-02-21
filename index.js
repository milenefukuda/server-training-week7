import express from "express";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

// https://github.com/karenokasaki/server-training-week7/blob/atividade/index.js

//habilitando a aplicação a ter variáveis de ambiente
dotenv.config();
//como acessar as variáveis de ambiente:
console.log(process.env.PORT);

//instanciando a variável que será responsável pelo nosso servidor: app
const app = express();

//configurar nosso servidor para que ele possa receber e enviar arquivos em json
app.use(express.json());

//banco de dados que usaremos de exemplo
const db = [
  {
    id: uuidv4(),
    user: "karen",
    age: 29,
    role: "professora",
    active: true,
    endereco: {
      cidade: "ribas do rio pardo",
      estado: "MS",
    },
    tarefas: ["fazer a próxima aula", "atualizar portal"],
  },
];

const processEnap = [
  {
    id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29",
    documentName: "Licitação Enap - Curso Web Dev",
    status: "Em andamento",
    details:
      "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack",
    dateInit: "28/11/2022",
    comments: [
      "Processo aberto",
      "Processo partiu para as partes assinarem",
      "Processo agora está em análise final",
      "Processo já tem data final",
    ],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
];
const processCompras = [
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Notebooks",
    status: "Em andamento",
    details: "Processo de licitação para compra de notebooks",
    dateInit: "30/11/2022",
    comments: ["Processo em aberto e sem previsão de conclusão"],
    dateEnd: "",
    setor: "tre",
  },
];
const processAr = [
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Ar Condicionado",
    status: "Finalizado",
    details: "Processo de licitação para compra de ar-condicionado",
    dateInit: "15/11/2022",
    comments: ["Processo em aberto", "Processo finalizado"],
    dateEnd: "25/11/2022",
    setor: "trj",
  },
];

//criação das rotas

app.get("/all-users", (req, res) => {
  console.log(req.url);
  console.log(req.method);

  return res
    .status(200)
    .json({ messagem: "Bem vindo ao servidor da turma 91 - ENAP", data: db });
});

app.get("/all-enap", (req, res) => {
  return res.status(200).json(processEnap);
});

app.get("/all-compras", (req, res) => {
  return res.status(200).json(processCompras);
});

app.get("/all-ar", (req, res) => {
  return res.status(200).json(processAr);
});

// aqui se faz o CREATE

app.post("/newUser", (req, res) => {
  console.log(req.body);

  let form = { ...req.body, id: uuidv4() };

  db.push(form);

  return res.status(201).json({
    data: form,
    message: "Usuário criado!",
  });
});

app.post("/create", (req, res) => {
  let cursos = { ...req.body, id: uuidv4() };
  processEnap.push(cursos);
  return res.status(201).json({ message: "Novo curso criado", processEnap });
});

app.post("/createCompras", (req, res) => {
  let compras = { ...req.body, id: uuidv4() };
  processCompras.push(compras);
  return res
    .status(201)
    .json({ message: "Nova compra criada", processCompras });
});

app.post("/createAr", (req, res) => {
  let ar = { ...req.body, id: uuidv4() };
  processAr.push(ar);
  return res
    .status(201)
    .json({ message: "Nova compra de ar criada", processAr });
});

//                      //                         //                       //

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  const user = db.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "Usário não encontrado" });
  }

  return res.status(200).json(user);
});

app.get("/process/:id", (req, res) => {
  const { id } = req.params;
  const userProcess = db.find((userProcess) => userProcess.id === id);
  return res.status(200).json(userProcess);
});

app.get("/userCurso/:id", (req, res) => {
  const { id } = req.params;
  const userCurso = processEnap.find((userCurso) => userCurso.id === id);
  if (!userCurso) {
    return res.status(404).json({ message: "Curso não encontrado" });
  }
  return res.status(200).json(userCurso);
});

app.get("/processCurso/:id", (req, res) => {
  const { id } = req.params;
  const userProcessCurso = processEnap.find(
    (userProcessCurso) => userProcessCurso.id === id
  );
  return res.status(200).json(userProcessCurso);
});

// aqui se faz o get de details

app.get("/userCompras/:id", (req, res) => {
  const { id } = req.params;
  const userCompras = processCompras.find(
    (userCompras) => userCompras.id === id
  );
  if (!userCompras) {
    return res.status(404).json({ message: "Compra não localizada" });
  }
  return res.status(200).json(userCompras);
});

app.get("/processCompras/:id", (req, res) => {
  const { id } = req.params;
  const userProcessCompras = processCompras.find(
    (userProcessCompras) => userProcessCompras.id === id
  );
  return res.status(200).json(userProcessCompras);
});

app.get("/userAr/:id", (req, res) => {
  const { id } = req.params;
  const userAr = processAr.find((userAr) => userAr.id === id);
  if (!userAr) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }
  return res.status(200).json(userAr);
});

app.get("/processAr/:id", (req, res) => {
  const { id } = req.params;
  const userProcessAr = processAr.find(
    (userProcessAr) => userProcessAr.id === id
  );
  return res.status(200).json(userProcessAr);
});

// assim se deleta ou se pode tbm usar a lógica do filter

app.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;

  const deleteById = db.find((user) => user.id === id);

  const index = db.indexOf(deleteById);

  db.splice(index, 1);

  return res.status(200).json(db);
});

app.delete("/deleteCurso/:id"),
  (req, res) => {
    const { id } = req.params;
    const deleteCursoById = processEnap.find(
      (userCurso) => userCurso.id === id
    );
    const indexCurso = processEnap.indexOf(deleteCursoById);
    processEnap.splice(indexCurso, 1);
    return res.status(200).json(processEnap);
  };

app.delete("/deleteCompras/:id"),
  (req, res) => {
    const { id } = req.params;
    const deleteComprasById = processCompras.find(
      (userCompras) => userCompras.id === id
    );
    const indexCompras = processCompras.indexOf(deleteComprasById);
    processCompras.splice(indexCompras, 1);
    return res.status(200).json(processCompras);
  };

app.delete("/deleteAr/:id"),
  (req, res) => {
    const { id } = req.params;
    const deleteArById = processAr.find((userAr) => userAr.id === id);
    const indexAr = processAr.indexOf(deleteArById);
    processAr.splice(indexAr, 1);
    return res.status(200).json(processAr);
  };
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

app.put("/editCurso/:id", (req, res) => {
  const { id } = req.params;
  const userCurso = processEnap.find((userCurso) => userCurso.id === id);
  const indexCurso = processEnap.indexOf(userCurso);
  processEnap[indexCurso] = { ...userCurso, ...req.body };
  return res.status(200).json(processEnap[indexCurso]);
});

app.put("/editCompras/:id", (req, res) => {
  const { id } = req.params;
  const userCompras = processCompras.find(
    (userCompras) => userCompras.id === id
  );
  const indexCompras = processCompras.indexOf(userCompras);
  processCompras[indexCompras] = { ...userCompras, ...req.body };
  return res.status(200).json(processCompras[indexCompras]);
});

app.put("/editAr/:id", (req, res) => {
  const { id } = req.params;
  const userAr = processAr.find((userAr) => userAr.id === id);
  const indexAr = processAr.indexOf(userAr);
  processAr[indexAr] = { ...userAr, ...req.body };
  return res.status(200).json(processAr[indexAr]);
});

app.put("/addTarefa/:id", (req, res) => {
  const { id } = req.params;
  const tarefa = req.body.tarefa;

  const user = db.find((user) => user.id === id);
  const index = db.indexOf(user);

  // dessa maneira abaixo o push devolve apenas a quantidade (em números) de tarefas na array
  const update = db[index].tarefas.push(tarefa);

  return res.status(201).json(update);
});

// esse .put é para adicionar objetos na array

app.put("/addCurso2/:id", (req, res) => {
  const { id } = req.params;
  const comentarios = req.body.addComment;

  const userCurso = processEnap.find((userCurso) => userCurso.id === id);
  const indexCurso = processEnap.indexOf(userCurso);

  // na 308 é onde acontece a mudança e a 310 é quando busca o objeto ja atualizado
  processEnap[indexCurso].comments.push(comentarios);

  const updateCurso = processEnap.find((userCurso) => userCurso.id === id);

  return res.status(200).json(updateCurso);
});

app.put("/addCompras2/:id", (req, res) => {
  const { id } = req.params;
  const comentariosCompras = req.body.addComment;

  const userCompras = processCompras.find(
    (userCompras) => userCompras.id === id
  );
  const indexCompras = processCompras.indexOf(userCompras);

  processCompras[indexCompras].comments.push(comentariosCompras);

  const updateCompras = processCompras.find(
    (userCompras) => userCompras.id === id
  );
  return res.status(200).json(updateCompras);
});

app.put("/addAr2/:id", (req, res) => {
  const { id } = req.params;
  const comentariosAr = req.body.addComment;

  const userAr = processAr.find((userAr) => userAr.id === id);
  const indexAr = processAr.indexOf(userAr);
  processAr[indexAr].comments.push(comentariosAr);
  const updateAr = processAr.find((userAr) => userAr.id === id);
  return res.status(200).json(updateAr);
});

app.listen(process.env.PORT, () => {
  console.log(
    `App up and running on port: http://localhost:${process.env.PORT}`
  );
});

// pergunta sobre rep projeto 2 github
