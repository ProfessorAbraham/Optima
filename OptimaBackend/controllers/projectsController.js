const prisma = require("../prisma/prismaClient");

// get all Projecs of a user
const getAllProjects = async (req, res) => {
  const { userId } = req.params;

  try {
    projects = await prisma.project.findMany({
      where: {
        adminId: userId,
      },
    });

    res.status(200).json(projects);
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

//get a Project
const getProject = async (req, res) => {
  const { userId, projectId } = req.params;
  try {
    const project = await prisma.project.findFirst({
      where: {
        projectId: projectId,
        adminId: userId,
      },
    });

    if (!project) {
      throw Error("Project not found");
    }
    res.status(200).json(project);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};

// create a new project
const createProject = async (req, res) => {
  const { userId } = req.params;
  let { projectName, projectDescription, hasDeadLine, deadLine, startDate } =
    req.body;

  //   const time = new Date(`2024-11-11T${remindTime}:00Z`);
  if (!startDate) {
    startDate = new Date();
  }

  try {
    const project = await prisma.project.create({
      data: {
        projectName,
        description: projectDescription,
        hasDeadLine,
        adminId: userId,
        deadLine,
        startDate,
      },
    });

    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "error" });
  }
};

// update a project
const updateProject = async (req, res) => {
  const { projectId } = req.params;
  //   const { habitName, description, unit, remindMe } = req.body;
  const { projectName, projectDescription, deadLine, startDate } = req.body;

  try {
    const projectExists = await prisma.project.findFirst({
      where: {
        projectId: projectId,
      },
    });

    if (!projectExists) {
      throw Error("No projects found");
    }

    if (startDate < deadLine) {
      throw Error("Dead line should be after the start date");
    }
    const project = prisma.project.update({
      where: {
        projectId: projectId,
      },
      data: {
        projectName,
        description: projectDescription,
        deadLine,
        startDate,
      },
    });

    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
};

// delete a Project
const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const projectExist = await prisma.project.findFirst({
      where: {
        projectId,
      },
    });

    if (!projectExist) {
      throw Error("Project not found");
    }

    const project = await prisma.project.delete({
      where: {
        projectId,
      },
    });

    res.status(200).json(project);
  } catch (e) {
    console.log(e);

    res.status(404).json({ error: e.message });
  }
};

// get project members

const getMembers = async (req, res) => {
  const { projectId } = req.params;

  try {
    const member = await prisma.projectMember.findMany({
      where: {
        projectProjectId: projectId,
      },
    });
    res.status(200).json(member);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};

// add a user to a project

const addUser = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const projectExist = await prisma.project.findFirst({
      where: {
        projectId: projectId,
      },
    });
    if (!projectExist) {
      throw Error("Project doesnt exist");
    }
    const alreadyMember = await prisma.projectMember.findFirst({
      where: {
        userUserId: userId,
        projectProjectId: projectId,
      },
    });

    if (alreadyMember) {
      throw Error("this user is already a member of thsi  project");
    }
    const member = await prisma.projectMember.create({
      data: {
        projectProjectId: projectId,
        userUserId: userId,
      },
    });
    res.status(200).json(member);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};

// remove user from a project

const removeUser = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;

  try {
    const memberExist = await prisma.projectMember.findFirst({
      where: {
        projectProjectId: projectId,
        userUserId: userId,
      },
    });
    if (!memberExist) {
      throw Error("Member doesnt exist");
    }
    const member = await prisma.projectMember.delete({
      where: {
        projectMemberId: memberExist.projectMemberId,
        projectProjectId: projectId,
        userUserId: userId,
      },
    });
    res.status(200).json(member);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
  addUser,
  removeUser,
  getMembers,
};
