import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ 
  onMobileMenuToggle, 
  onSearch, 
  onQuickAdd,
  title = "Tasks",
  subtitle = "Manage your daily activities"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-100 sticky top-0 z-30"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileMenuToggle}
              className="lg:hidden"
            >
              <ApperIcon name="Menu" size={20} />
            </Button>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-600">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block w-80">
              <SearchBar
                onSearch={onSearch}
                placeholder="Search tasks..."
                className="w-full"
              />
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={onQuickAdd}
              icon="Plus"
              className="shadow-lg hover:shadow-xl"
            >
              <span className="hidden sm:inline">Add Task</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <SearchBar
            onSearch={onSearch}
            placeholder="Search tasks..."
            className="w-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Header;