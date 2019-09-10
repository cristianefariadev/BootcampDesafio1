const express = require(`express`);

const server = express();

server.use(express.json());

const projects = [];
let numberOfRequests = 0;

//Middleware que checa se o projeto existe
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}

//Middleware que dá log no número de requisições
function logRequests(req, res, next) {
  numberOfRequests++;

  console.log(`Número de requisições: ${numberOfRequests}`);

  return next();
}

server.use(logRequests);

//mostrar todos
server.get('/projects', (req, res) => {
  return res.json(projects);
})

//adicionar
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

//adicionar tasks
server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id == id);

  project.tasks.push(title);

  return res.json(project);
});

// Alteração do title do projeto
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id == id);

  project.title = title;

  return res.json(project);
});

// Deletar projeto por title
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectId = projects.findIndex(project => project.id == id);

  projects.splice(projectId, 1);

  return res.send();
});

server.listen(3000);