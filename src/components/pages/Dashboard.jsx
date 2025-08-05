import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import TaskList from "@/components/organisms/TaskList";
import QuickAddTask from "@/components/molecules/QuickAddTask";
import TaskModal from "@/components/molecules/TaskModal";
import { taskService } from "@/services/api/taskService";
import { categoryService } from "@/services/api/categoryService";

const Dashboard = ({ onMobileMenuToggle }) => {
  const { categoryId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

useEffect(() => {
    filterTasks();
  }, [tasks, categoryId, searchQuery]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

const filterTasks = useCallback(() => {
    let filtered = [...tasks];

    // Filter by category
    if (categoryId) {
      filtered = filtered.filter(task => {
        const taskCategoryId = task.categoryId?.Id || task.categoryId;
        return taskCategoryId === parseInt(categoryId);
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    // Sort by completion status and priority
    filtered.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    setFilteredTasks(filtered);
  }, [tasks, categoryId, searchQuery]);

const handleTaskUpdate = (updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.Id === updatedTask.Id ? updatedTask : task
      )
    );
  };

  const handleTaskAdd = (newTask) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };
  const handleTaskDelete = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.Id !== taskId));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleQuickAdd = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleModalClose = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleModalTaskUpdate = (task) => {
    if (editingTask) {
      handleTaskUpdate(task);
    } else {
      handleTaskAdd(task);
    }
  };

  const getPageTitle = () => {
if (categoryId) {
      const category = categories.find(cat => cat.Id === parseInt(categoryId));
      return category ? (category.Name || category.name) : "Category";
    }
    return "All Tasks";
  };

  const getPageSubtitle = () => {
    const totalTasks = filteredTasks.length;
    const completedTasks = filteredTasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    if (searchQuery.trim()) {
      return `Found ${totalTasks} tasks matching "${searchQuery}"`;
    }

if (categoryId) {
      const category = categories.find(cat => cat.Id === parseInt(categoryId));
      return category ? `${pendingTasks} pending, ${completedTasks} completed` : "Category tasks";
    }

    return `${pendingTasks} pending, ${completedTasks} completed`;
  };

  const getEmptyType = () => {
    if (searchQuery.trim()) return "search";
    if (categoryId) return "category";
    return "tasks";
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header
        onMobileMenuToggle={onMobileMenuToggle}
        onSearch={setSearchQuery}
        onQuickAdd={handleQuickAdd}
        title={getPageTitle()}
        subtitle={getPageSubtitle()}
      />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <QuickAddTask
              categories={categories}
              onTaskAdded={handleTaskAdd}
              selectedCategoryId={categoryId ? parseInt(categoryId) : null}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TaskList
              tasks={filteredTasks}
              categories={categories}
              loading={loading}
              error={error}
              onTaskUpdate={handleTaskUpdate}
              onTaskDelete={handleTaskDelete}
              onEditTask={handleEditTask}
              onRetry={loadData}
              emptyType={getEmptyType()}
              onAddTask={handleQuickAdd}
            />
          </motion.div>
        </div>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleModalClose}
        task={editingTask}
        categories={categories}
        onTaskUpdate={handleModalTaskUpdate}
      />
    </div>
  );
};

export default Dashboard;