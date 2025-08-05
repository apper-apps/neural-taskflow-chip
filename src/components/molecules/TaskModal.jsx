import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";

const TaskModal = ({ isOpen, onClose, task, categories, onTaskUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryForm, setNewCategoryForm] = useState({
    Name: "",
    color: "#5B4EF5"
  });
const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    projectId: "",
    priority: "medium",
    dueDate: ""
  });
useEffect(() => {
    if (task) {
setFormData({
        title: task.title || "",
        description: task.description || "",
        categoryId: task.categoryId?.Id || task.categoryId || "",
        projectId: task.projectId?.Id || task.projectId || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate || ""
      });
    } else {
      setFormData({
        title: "",
        description: "",
        categoryId: categories.length > 0 ? categories[0].Id : "",
        projectId: "",
        priority: "medium",
        dueDate: new Date().toISOString().split("T")[0]
      });
    }
  }, [task, categories]);

  const handleClose = () => {
    onClose();
    setFormData({
      title: "",
      description: "",
      categoryId: "",
      priority: "medium",
      dueDate: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    setIsLoading(true);
    try {
      let updatedTask;
if (task) {
updatedTask = await taskService.update(task.Id, {
          ...formData,
          categoryId: parseInt(formData.categoryId),
          projectId: formData.projectId ? parseInt(formData.projectId) : null
        });
        if (updatedTask) {
          toast.success("Task updated successfully!");
        }
      } else {
        updatedTask = await taskService.create({
          ...formData,
          categoryId: parseInt(formData.categoryId),
          projectId: formData.projectId ? parseInt(formData.projectId) : null
        });
        if (updatedTask) {
          toast.success("Task created successfully!");
        }
      }
      
      onTaskUpdate(updatedTask);
      handleClose();
    } catch (error) {
      toast.error(task ? "Failed to update task" : "Failed to create task");
      console.error("Error saving task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "text-success",
      medium: "text-warning",
      high: "text-accent",
      urgent: "text-error"
    };
    return colors[priority] || colors.medium;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                {task ? "Edit Task" : "Create New Task"}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>

<div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit} className="h-full flex flex-col">
                <div className="p-6 space-y-6 flex-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter task title..."
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    placeholder="Add task description..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <Select
                      value={formData.categoryId}
                      onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.Id} value={category.Id}>
                          {category.Name || category.name}
                        </option>
                      ))}
                    </Select>
                    
                    {!showAddCategory && (
                      <button
                        type="button"
                        onClick={() => setShowAddCategory(true)}
                        className="mt-2 text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
                      >
                        <ApperIcon name="Plus" size={14} />
                        Add Category
                      </button>
                    )}

                    {showAddCategory && (
                      <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-gray-700">Create New Category</h4>
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddCategory(false);
                              setNewCategoryForm({ Name: "", color: "#5B4EF5" });
                            }}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <ApperIcon name="X" size={16} />
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Category Name *
                            </label>
                            <Input
                              value={newCategoryForm.Name}
                              onChange={(e) => setNewCategoryForm(prev => ({ ...prev, Name: e.target.value }))}
                              placeholder="Enter category name"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Color
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="color"
                                value={newCategoryForm.color}
                                onChange={(e) => setNewCategoryForm(prev => ({ ...prev, color: e.target.value }))}
                                className="w-8 h-8 rounded border"
                              />
                              <span className="text-sm text-gray-500">{newCategoryForm.color}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <Button
                              type="button"
                              size="sm"
                              onClick={async () => {
                                if (!newCategoryForm.Name.trim()) {
                                  toast.error("Category name is required");
                                  return;
                                }
                                
                                setIsCreatingCategory(true);
                                try {
                                  const newCategory = await categoryService.create({
                                    Name: newCategoryForm.Name.trim(),
                                    color: newCategoryForm.color,
                                    icon: "Folder"
                                  });
                                  
                                  if (newCategory) {
                                    toast.success("Category created successfully");
                                    setFormData(prev => ({ ...prev, categoryId: newCategory.Id }));
                                    setShowAddCategory(false);
                                    setNewCategoryForm({ Name: "", color: "#5B4EF5" });
                                    
                                    // Trigger categories refresh
                                    if (onTaskUpdate) {
                                      onTaskUpdate();
                                    }
                                  }
                                } catch (error) {
                                  toast.error("Failed to create category");
                                } finally {
                                  setIsCreatingCategory(false);
                                }
                              }}
                              loading={isCreatingCategory}
                              disabled={!newCategoryForm.Name.trim()}
                            >
                              Create
                            </Button>
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() => {
                                setShowAddCategory(false);
                                setNewCategoryForm({ Name: "", color: "#5B4EF5" });
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

<div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project (Optional)
                    </label>
                    <Select
                      value={formData.projectId}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectId: e.target.value }))}
                    >
                      <option value="">No Project</option>
                      {/* Projects will be loaded via service */}
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <Select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                      className={getPriorityColor(formData.priority)}
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </Select>
                  </div>
                </div>

<div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
                </div>
                
                {/* Fixed Footer with Action Buttons */}
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-end space-x-3 rounded-b-2xl">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={isLoading}
                    disabled={!formData.title.trim()}
                  >
                    {task ? "Update Task" : "Create Task"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;