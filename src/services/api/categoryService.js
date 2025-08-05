import { toast } from "react-toastify";

export const categoryService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "color" } },
          { field: { Name: "icon" } },
          { field: { Name: "taskCount" } }
        ],
        orderBy: [
          { fieldName: "Id", sorttype: "ASC" }
        ]
      };

      const response = await apperClient.fetchRecords("category", params);
      
      if (!response.success) {
        console.error("Error fetching categories:", response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching categories:", error.response.data.message);
      } else {
        console.error("Error fetching categories:", error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "color" } },
          { field: { Name: "icon" } },
          { field: { Name: "taskCount" } }
        ]
      };

      const response = await apperClient.getRecordById("category", parseInt(id), params);
      
      if (!response.success) {
        console.error("Error fetching category:", response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching category:", error.response.data.message);
      } else {
        console.error("Error fetching category:", error.message);
      }
      return null;
    }
  },

  async create(categoryData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Name: categoryData.Name || categoryData.name,
          color: categoryData.color || "#5B4EF5",
          icon: categoryData.icon || "Folder",
          taskCount: 0
        }]
      };

      const response = await apperClient.createRecord("category", params);
      
      if (!response.success) {
        console.error("Error creating category:", response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} categories:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating category:", error.response.data.message);
      } else {
        console.error("Error creating category:", error.message);
      }
      return null;
    }
  },

  async update(id, categoryData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          Name: categoryData.Name || categoryData.name,
          color: categoryData.color,
          icon: categoryData.icon,
          taskCount: categoryData.taskCount
        }]
      };

      const response = await apperClient.updateRecord("category", params);
      
      if (!response.success) {
        console.error("Error updating category:", response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} categories:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating category:", error.response.data.message);
      } else {
        console.error("Error updating category:", error.message);
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord("category", params);
      
      if (!response.success) {
        console.error("Error deleting category:", response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} categories:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }

      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting category:", error.response.data.message);
      } else {
        console.error("Error deleting category:", error.message);
      }
      return false;
    }
  },

  async updateTaskCount(id, count) {
    try {
      // Get current category first
      const currentCategory = await this.getById(id);
      if (!currentCategory) {
        return null;
      }

      // Update with new task count
      return await this.update(id, {
        ...currentCategory,
        taskCount: count
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task count:", error.response.data.message);
      } else {
        console.error("Error updating task count:", error.message);
      }
      return null;
    }
  }
};