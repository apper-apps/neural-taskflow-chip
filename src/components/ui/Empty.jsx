import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  type = "tasks",
  onAction,
  actionLabel = "Add New"
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case "tasks":
        return {
          icon: "CheckSquare",
          title: "No tasks yet",
          description: "Start organizing your day by creating your first task. Stay focused and get things done!",
          illustration: "🎯"
        };
      case "search":
        return {
          icon: "Search",
          title: "No results found",
          description: "We couldn't find any tasks matching your search. Try adjusting your search terms.",
          illustration: "🔍"
        };
      case "category":
        return {
          icon: "FolderOpen",
          title: "No tasks in this category",
          description: "This category is empty. Add some tasks to get started organizing your work.",
          illustration: "📁"
        };
      case "completed":
        return {
          icon: "Trophy",
          title: "No completed tasks",
          description: "Complete some tasks to see your achievements here. You've got this!",
          illustration: "🏆"
        };
      case "overdue":
        return {
          icon: "Clock",
          title: "No overdue tasks",
          description: "Great job staying on top of your tasks! Keep up the excellent work.",
          illustration: "✅"
        };
      default:
        return {
          icon: "Inbox",
          title: "Nothing here yet",
          description: "Start by adding some content to get organized.",
          illustration: "📋"
        };
    }
  };

  const { icon, title, description, illustration } = getEmptyContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 0.1, 
          type: "spring", 
          stiffness: 200,
          damping: 20
        }}
        className="text-6xl mb-6"
      >
        {illustration}
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={icon} size={32} className="text-primary" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-gray-900 mb-2 text-center"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 text-center mb-8 max-w-md"
      >
        {description}
      </motion.p>

      {onAction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={onAction}
            variant="primary"
            icon="Plus"
            size="lg"
            className="shadow-lg hover:shadow-xl"
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Empty;