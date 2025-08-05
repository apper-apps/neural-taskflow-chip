import categoriesData from "@/services/mockData/categories.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let categories = [...categoriesData];

export const categoryService = {
  async getAll() {
    await delay(300);
    return [...categories];
  },

  async getById(id) {
    await delay(200);
    const category = categories.find(cat => cat.Id === parseInt(id));
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(400);
    const newCategory = {
      Id: Math.max(...categories.map(cat => cat.Id)) + 1,
      ...categoryData,
      taskCount: 0
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, categoryData) {
    await delay(350);
    const index = categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    categories[index] = { ...categories[index], ...categoryData };
    return { ...categories[index] };
  },

  async delete(id) {
    await delay(300);
    const index = categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    categories.splice(index, 1);
    return true;
  },

  async updateTaskCount(id, count) {
    await delay(200);
    const index = categories.findIndex(cat => cat.Id === parseInt(id));
    if (index !== -1) {
      categories[index].taskCount = count;
      return { ...categories[index] };
    }
    return null;
  }
};