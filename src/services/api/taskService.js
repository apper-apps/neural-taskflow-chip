import { toast } from "react-toastify";
import React from "react";
import Error from "@/components/ui/Error";

export const taskService = {
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
          { field: { Name: "title" } },
          { field: { Name: "taskId" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "projectId" } },
          { field: { Name: "priority" } },
          { field: { Name: "assignedTo" } },
          { field: { Name: "startDate" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "estimatedTime" } },
          { field: { Name: "taskStatus" } },
          { field: { Name: "progress" } },
          { field: { Name: "completed" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } }
        ],
        orderBy: [
          { fieldName: "Id", sorttype: "DESC" }
        ]
      };

      const response = await apperClient.fetchRecords("task", params);
      
      if (!response.success) {
        console.error("Error fetching tasks:", response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error.response.data.message);
      } else {
        console.error("Error fetching tasks:", error.message);
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
          { field: { Name: "title" } },
          { field: { Name: "taskId" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "projectId" } },
          { field: { Name: "priority" } },
          { field: { Name: "assignedTo" } },
          { field: { Name: "startDate" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "estimatedTime" } },
          { field: { Name: "taskStatus" } },
          { field: { Name: "progress" } },
          { field: { Name: "completed" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } }
        ]
      };

      const response = await apperClient.getRecordById("task", parseInt(id), params);
      
      if (!response.success) {
        console.error("Error fetching task:", response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching task:", error.response.data.message);
      } else {
        console.error("Error fetching task:", error.message);
      }
      return null;
    }
  },

  async getByCategory(categoryId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "taskId" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "projectId" } },
          { field: { Name: "priority" } },
          { field: { Name: "assignedTo" } },
          { field: { Name: "startDate" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "estimatedTime" } },
          { field: { Name: "taskStatus" } },
          { field: { Name: "progress" } },
          { field: { Name: "completed" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } }
        ],
        where: [
          {
            FieldName: "categoryId",
            Operator: "EqualTo",
            Values: [parseInt(categoryId)]
          }
        ]
      };

      const response = await apperClient.fetchRecords("task", params);
      
      if (!response.success) {
        console.error("Error fetching tasks by category:", response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by category:", error.response.data.message);
      } else {
        console.error("Error fetching tasks by category:", error.message);
      }
      return [];
    }
  },

  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
records: [{
          Name: taskData.title || taskData.Name,
          title: taskData.title,
          taskId: taskData.taskId || "",
          description: taskData.description || "",
          categoryId: parseInt(taskData.categoryId),
          projectId: taskData.projectId ? parseInt(taskData.projectId) : null,
          priority: taskData.priority || "medium",
          assignedTo: taskData.assignedTo ? parseInt(taskData.assignedTo) : null,
          startDate: taskData.startDate || "",
          dueDate: taskData.dueDate || "",
          estimatedTime: taskData.estimatedTime ? parseInt(taskData.estimatedTime) : null,
          taskStatus: taskData.taskStatus || "New",
          progress: taskData.progress ? parseInt(taskData.progress) : 0,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]
      };

      const response = await apperClient.createRecord("task", params);
      
      if (!response.success) {
        console.error("Error creating task:", response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} tasks:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error creating task:", error.response.data.message);
      } else {
        console.error("Error creating task:", error.message);
      }
      return null;
    }
  },

  async update(id, taskData) {
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
          Name: taskData.title || taskData.Name,
          title: taskData.title,
          taskId: taskData.taskId,
          description: taskData.description,
          categoryId: parseInt(taskData.categoryId),
          projectId: taskData.projectId ? parseInt(taskData.projectId) : null,
          priority: taskData.priority,
          assignedTo: taskData.assignedTo ? parseInt(taskData.assignedTo) : null,
          startDate: taskData.startDate,
          dueDate: taskData.dueDate,
          estimatedTime: taskData.estimatedTime ? parseInt(taskData.estimatedTime) : null,
          taskStatus: taskData.taskStatus,
          progress: taskData.progress ? parseInt(taskData.progress) : 0,
          completed: taskData.completed,
          updatedAt: new Date().toISOString()
        }]
      };

      const response = await apperClient.updateRecord("task", params);
      
      if (!response.success) {
        console.error("Error updating task:", response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} tasks:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error updating task:", error.response.data.message);
      } else {
        console.error("Error updating task:", error.message);
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

      const response = await apperClient.deleteRecord("task", params);
      
      if (!response.success) {
        console.error("Error deleting task:", response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} tasks:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }

      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error.response.data.message);
      } else {
        console.error("Error deleting task:", error.message);
      }
      return false;
    }
  },

  async toggleComplete(id) {
    try {
      // First get the current task
      const currentTask = await this.getById(id);
      if (!currentTask) {
        throw new Error("Task not found");
      }

      // Update with toggled completion status
      return await this.update(id, {
        ...currentTask,
        completed: !currentTask.completed
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error toggling task completion:", error.response.data.message);
      } else {
        console.error("Error toggling task completion:", error.message);
      }
      return null;
    }
  },

  async search(query) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "taskId" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "projectId" } },
          { field: { Name: "priority" } },
          { field: { Name: "assignedTo" } },
          { field: { Name: "startDate" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "estimatedTime" } },
          { field: { Name: "taskStatus" } },
          { field: { Name: "progress" } },
          { field: { Name: "completed" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "title",
                    operator: "Contains",
                    values: [query]
                  }
                ],
                operator: "OR"
              },
              {
                conditions: [
                  {
                    fieldName: "description",
                    operator: "Contains",
                    values: [query]
                  }
                ],
                operator: "OR"
              }
            ]
          }
        ]
      };

      const response = await apperClient.fetchRecords("task", params);
      
      if (!response.success) {
        console.error("Error searching tasks:", response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching tasks:", error.response.data.message);
      } else {
        console.error("Error searching tasks:", error.message);
      }
      return [];
    }
  },

  async getByPriority(priority) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "taskId" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "projectId" } },
          { field: { Name: "priority" } },
          { field: { Name: "assignedTo" } },
          { field: { Name: "startDate" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "estimatedTime" } },
          { field: { Name: "taskStatus" } },
          { field: { Name: "progress" } },
          { field: { Name: "completed" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } }
        ],
        where: [
          {
            FieldName: "priority",
            Operator: "EqualTo",
            Values: [priority]
          }
        ]
      };

      const response = await apperClient.fetchRecords("task", params);
      
      if (!response.success) {
        console.error("Error fetching tasks by priority:", response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by priority:", error.response.data.message);
      } else {
        console.error("Error fetching tasks by priority:", error.message);
      }
      return [];
    }
  },

  async getCompleted() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "taskId" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "projectId" } },
          { field: { Name: "priority" } },
          { field: { Name: "assignedTo" } },
          { field: { Name: "startDate" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "estimatedTime" } },
          { field: { Name: "taskStatus" } },
          { field: { Name: "progress" } },
          { field: { Name: "completed" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } }
        ],
        where: [
          {
            FieldName: "completed",
            Operator: "EqualTo",
            Values: [true]
          }
        ]
      };

      const response = await apperClient.fetchRecords("task", params);
      
      if (!response.success) {
        console.error("Error fetching completed tasks:", response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching completed tasks:", error.response.data.message);
      } else {
        console.error("Error fetching completed tasks:", error.message);
      }
      return [];
    }
  },

  async getPending() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "taskId" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "projectId" } },
          { field: { Name: "priority" } },
          { field: { Name: "assignedTo" } },
          { field: { Name: "startDate" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "estimatedTime" } },
          { field: { Name: "taskStatus" } },
          { field: { Name: "progress" } },
          { field: { Name: "completed" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } }
        ],
        where: [
          {
            FieldName: "completed",
            Operator: "EqualTo",
            Values: [false]
          }
        ]
      };

      const response = await apperClient.fetchRecords("task", params);
      
      if (!response.success) {
        console.error("Error fetching pending tasks:", response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching pending tasks:", error.response.data.message);
      } else {
        console.error("Error fetching pending tasks:", error.message);
      }
      return [];
    }
  },

  async getOverdue() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "taskId" } },
          { field: { Name: "description" } },
          { field: { Name: "categoryId" } },
          { field: { Name: "projectId" } },
          { field: { Name: "priority" } },
          { field: { Name: "assignedTo" } },
          { field: { Name: "startDate" } },
          { field: { Name: "dueDate" } },
          { field: { Name: "estimatedTime" } },
          { field: { Name: "taskStatus" } },
          { field: { Name: "progress" } },
          { field: { Name: "completed" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } }
        ],
        whereGroups: [
          {
            operator: "AND",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "completed",
                    operator: "EqualTo",
                    values: [false]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "dueDate",
                    operator: "LessThan",
                    values: [today.toISOString().split('T')[0]]
                  }
                ]
              }
            ]
          }
        ]
      };

      const response = await apperClient.fetchRecords("task", params);
      
      if (!response.success) {
        console.error("Error fetching overdue tasks:", response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
} catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching overdue tasks:", error.response.data.message);
      } else {
        console.error("Error fetching overdue tasks:", error.message);
      }
      return [];
    }
  }
};