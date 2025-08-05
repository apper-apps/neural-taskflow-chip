import tasksData from "@/services/mockData/tasks.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let tasks = [...tasksData];

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(task => task.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  },

  async getByCategory(categoryId) {
    await delay(250);
    return tasks.filter(task => task.categoryId === parseInt(categoryId));
  },

  async create(taskData) {
    await delay(400);
    const newTask = {
      Id: Math.max(...tasks.map(task => task.Id)) + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, taskData) {
    await delay(350);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    tasks[index] = { 
      ...tasks[index], 
      ...taskData,
      updatedAt: new Date().toISOString()
    };
    return { ...tasks[index] };
  },

  async delete(id) {
    await delay(300);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    tasks.splice(index, 1);
    return true;
  },

  async toggleComplete(id) {
    await delay(250);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    tasks[index].completed = !tasks[index].completed;
    tasks[index].updatedAt = new Date().toISOString();
    return { ...tasks[index] };
  },

  async search(query) {
    await delay(200);
    const searchTerm = query.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    );
  },

  async getByPriority(priority) {
    await delay(200);
    return tasks.filter(task => task.priority === priority);
  },

  async getCompleted() {
    await delay(200);
    return tasks.filter(task => task.completed);
  },

  async getPending() {
    await delay(200);
    return tasks.filter(task => !task.completed);
  },

  async getOverdue() {
    await delay(200);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      if (task.completed) return false;
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today;
    });
  }
};