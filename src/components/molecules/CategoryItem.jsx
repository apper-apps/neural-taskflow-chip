import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const CategoryItem = ({ category, isActive, taskCount = 0 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isActive) {
      navigate("/");
    } else {
      navigate(`/category/${category.Id}`);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
        isActive
          ? "bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 shadow-sm"
          : "hover:bg-gray-50 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center space-x-3">
        <motion.div
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
            isActive
              ? "bg-gradient-to-br from-primary to-secondary shadow-md"
              : "group-hover:scale-110"
          }`}
          style={{
            backgroundColor: !isActive ? `${category.color}15` : undefined
          }}
        >
          <ApperIcon
            name={category.icon}
            size={20}
            className={isActive ? "text-white" : ""}
            style={{ color: !isActive ? category.color : undefined }}
          />
        </motion.div>

        <div className="text-left">
          <h3 className={`font-medium ${
            isActive ? "text-primary" : "text-gray-900"
          }`}>
            {category.name}
          </h3>
        </div>
      </div>

      {taskCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center space-x-2"
        >
          <Badge
            variant={isActive ? "primary" : "default"}
            size="sm"
            className="font-semibold"
          >
            {taskCount}
          </Badge>
        </motion.div>
      )}
    </motion.button>
  );
};

export default CategoryItem;