import React, { useState } from "react";
import { motion } from "framer-motion";
import { format, isToday, isPast, parseISO } from "date-fns";
import { toast } from "react-toastify";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { taskService } from "@/services/api/taskService";

const TaskCard = ({ task, category, onTaskUpdate, onTaskDelete, onEditTask }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      const updatedTask = await taskService.toggleComplete(task.Id);
      onTaskUpdate(updatedTask);
      toast.success(updatedTask.completed ? "Task completed! 🎉" : "Task reopened");
    } catch (error) {
      toast.error("Failed to update task");
      console.error("Error toggling task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setIsLoading(true);
    try {
      await taskService.delete(task.Id);
      onTaskDelete(task.Id);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
      console.error("Error deleting task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      low: { variant: "success", label: "Low", icon: "ArrowDown" },
      medium: { variant: "warning", label: "Medium", icon: "Minus" },
      high: { variant: "error", label: "High", icon: "ArrowUp" },
      urgent: { variant: "error", label: "Urgent", icon: "AlertTriangle" }
    };
    return configs[priority] || configs.medium;
  };

  const getDueDateStatus = () => {
    if (!task.dueDate) return null;
    
    const dueDate = parseISO(task.dueDate);
    const today = new Date();
    
    if (task.completed) return null;
    
    if (isPast(dueDate) && !isToday(dueDate)) {
      return { variant: "error", label: "Overdue", urgent: true };
    } else if (isToday(dueDate)) {
      return { variant: "warning", label: "Due Today", urgent: true };
    }
    
    return { variant: "default", label: format(dueDate, "MMM d"), urgent: false };
  };

  const priorityConfig = getPriorityConfig(task.priority);
  const dueDateStatus = getDueDateStatus();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2, shadow: "0 8px 25px rgba(0,0,0,0.1)" }}
      className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 ${
        task.completed 
          ? "border-gray-200 opacity-75" 
          : "border-gray-100 hover:border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-1"
          >
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
              disabled={isLoading}
            />
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-lg mb-2 leading-tight ${
              task.completed 
                ? "text-gray-500 line-through" 
                : "text-gray-900"
            }`}>
              {task.title}
            </h3>

            {task.description && (
              <p className={`text-sm mb-3 line-clamp-2 ${
                task.completed ? "text-gray-400" : "text-gray-600"
              }`}>
                {task.description}
              </p>
            )}

            <div className="flex items-center space-x-3">
              {category && (
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-gray-600 font-medium">
                    {category.name}
                  </span>
                </div>
              )}

              <Badge 
                variant={priorityConfig.variant}
                size="sm"
                className="flex items-center space-x-1"
              >
                <ApperIcon name={priorityConfig.icon} size={12} />
                <span>{priorityConfig.label}</span>
              </Badge>

              {dueDateStatus && (
                <Badge 
                  variant={dueDateStatus.variant}
                  size="sm"
                  className={`flex items-center space-x-1 ${
                    dueDateStatus.urgent ? "animate-pulse" : ""
                  }`}
                >
                  <ApperIcon name="Calendar" size={12} />
                  <span>{dueDateStatus.label}</span>
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditTask(task)}
            className="text-gray-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ApperIcon name="Edit3" size={16} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            loading={isLoading}
            className="text-gray-400 hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ApperIcon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;