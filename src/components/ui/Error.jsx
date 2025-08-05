import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  type = "general"
}) => {
  const getErrorContent = () => {
    switch (type) {
      case "tasks":
        return {
          icon: "AlertTriangle",
          title: "Failed to load tasks",
          description: "We couldn't fetch your tasks. Please check your connection and try again."
        };
      case "categories":
        return {
          icon: "Folder",
          title: "Failed to load categories",
          description: "We couldn't fetch your categories. Please check your connection and try again."
        };
      default:
        return {
          icon: "XCircle",
          title: "Something went wrong",
          description: message
        };
    }
  };

  const { icon, title, description } = getErrorContent();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-16 h-16 bg-gradient-to-br from-error/10 to-error/20 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={icon} size={32} className="text-error" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-gray-900 mb-2 text-center"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 text-center mb-8 max-w-md"
      >
        {description}
      </motion.p>

      {onRetry && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onRetry}
            variant="primary"
            icon="RefreshCw"
            className="shadow-lg hover:shadow-xl"
          >
            Try Again
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Error;