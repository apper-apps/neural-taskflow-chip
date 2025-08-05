import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search tasks...", 
  className = "",
  debounceMs = 300
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      onSearch("");
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch, debounceMs]);

  const handleClear = () => {
    setSearchTerm("");
    setIsSearching(false);
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        icon="Search"
        iconPosition="left"
        className="pr-10"
      />
      
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
        {isSearching && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <ApperIcon 
              name="Loader2" 
              size={16} 
              className="text-primary animate-spin" 
            />
          </motion.div>
        )}
        
        {searchTerm && !isSearching && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClear}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="X" size={14} className="text-gray-400" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;