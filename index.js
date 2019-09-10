const express = require(`express`);

const server = express();

server.use(express.json());

const projects = [];

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