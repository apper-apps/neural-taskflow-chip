import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import CategoryItem from "@/components/molecules/CategoryItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { categoryService } from "@/services/api/categoryService";
import { taskService } from "@/services/api/taskService";

const Sidebar = ({ isMobileOpen, onMobileToggle }) => {
  const { categoryId } = useParams();
  const [categories, setCategories] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const [categoriesData, tasksData] = await Promise.all([
        categoryService.getAll(),
        taskService.getAll()
      ]);
      
      setCategories(categoriesData);
      
      // Calculate task counts per category
      const counts = {};
      categoriesData.forEach(category => {
        counts[category.Id] = tasksData.filter(task => 
          task.categoryId === category.Id && !task.completed
        ).length;
      });
      setTaskCounts(counts);
      
    } catch (err) {
      setError(err.message);
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
            <ApperIcon name="CheckSquare" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <p className="text-sm text-gray-500">Stay organized</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Categories
          </h2>

          {loading ? (
            <Loading type="categories" />
          ) : error ? (
            <Error 
              type="categories"
              message={error}
              onRetry={loadData}
            />
          ) : (
            <div className="space-y-2">
              {categories.map(category => (
                <CategoryItem
                  key={category.Id}
                  category={category}
                  isActive={parseInt(categoryId) === category.Id}
                  taskCount={taskCounts[category.Id] || 0}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Target" size={16} className="text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Daily Goal</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Complete {Math.max(5, Object.values(taskCounts).reduce((a, b) => a + b, 0))} tasks today
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "45%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">45% completed</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-white border-r border-gray-100 h-screen sticky top-0">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onMobileToggle}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMobileOpen ? 0 : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="lg:hidden fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={20} className="text-white" />
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
          <button
            onClick={onMobileToggle}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="X" size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="h-[calc(100%-5rem)] overflow-y-auto">
          {sidebarContent}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;