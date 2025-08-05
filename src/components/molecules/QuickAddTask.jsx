import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import { taskService } from "@/services/api/taskService";

const QuickAddTask = ({ categories, onTaskAdded, selectedCategoryId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
const [taskData, setTaskData] = useState({
    title: "",
    categoryId: selectedCategoryId || (categories.length > 0 ? categories[0].Id : ""),
    projectId: "",
    priority: "medium",
    dueDate: new Date().toISOString().split("T")[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    setIsLoading(true);
    try {
const newTask = await taskService.create({
        ...taskData,
        categoryId: parseInt(taskData.categoryId),
        projectId: taskData.projectId ? parseInt(taskData.projectId) : null,
        description: ""
      });
      
setTaskData({
        title: "",
        categoryId: selectedCategoryId || (categories.length > 0 ? categories[0].Id : ""),
        projectId: "",
        priority: "medium",
        dueDate: new Date().toISOString().split("T")[0]
      });
      
      setIsExpanded(false);
      onTaskAdded(newTask);
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error("Failed to create task");
      console.error("Error creating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === "Escape") {
      setIsExpanded(false);
      setTaskData(prev => ({ ...prev, title: "" }));
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
    <motion.div
      layout
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <motion.div
        layout
        className="p-4"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={taskData.title}
                onChange={(e) => setTaskData(prev => ({ ...prev, title: e.target.value }))}
                onFocus={() => setIsExpanded(true)}
                onKeyDown={handleKeyDown}
                icon="Plus"
                className="border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsExpanded(false);
                    setTaskData(prev => ({ ...prev, title: "" }));
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  loading={isLoading}
                  disabled={!taskData.title.trim()}
                >
                  Add Task
                </Button>
              </motion.div>
            )}
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select
                  value={taskData.categoryId}
                  onChange={(e) => setTaskData(prev => ({ ...prev, categoryId: e.target.value }))}
                  className="text-sm"
                >
                  {categories.map(category => (
<option key={category.Id} value={category.Id}>
                      {category.Name || category.name}
                    </option>
                  ))}
                </Select>
</div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project
                </label>
                <Select
                  value={taskData.projectId}
                  onChange={(e) => setTaskData(prev => ({ ...prev, projectId: e.target.value }))}
                  className="text-sm"
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
                  value={taskData.priority}
                  onChange={(e) => setTaskData(prev => ({ ...prev, priority: e.target.value }))}
                  className={`text-sm ${getPriorityColor(taskData.priority)}`}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={taskData.dueDate}
                  onChange={(e) => setTaskData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="text-sm"
                />
              </div>
</motion.div>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default QuickAddTask;