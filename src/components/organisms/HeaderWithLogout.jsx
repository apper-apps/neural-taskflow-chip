import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import ApperIcon from '@/components/ApperIcon';
import { AuthContext } from '../../App';

const HeaderWithLogout = ({ onMobileMenuToggle, onSearch, onQuickAdd, title, subtitle, showQuickAdd = true }) => {
  const { logout } = useContext(AuthContext);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-100 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            icon="Menu"
            onClick={onMobileMenuToggle}
            className="lg:hidden"
          />
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <SearchBar
              onSearch={onSearch}
              placeholder="Search tasks..."
              className="w-64"
            />
          </div>

          {showQuickAdd && (
            <Button
              variant="primary"
              size="md"
              icon="Plus"
              onClick={onQuickAdd}
              className="hidden sm:flex"
            >
              Add Task
            </Button>
          )}

          <Button
            variant="secondary"
            size="md"
            icon="LogOut"
            onClick={logout}
            className="ml-2"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="md:hidden mt-4">
        <SearchBar
          onSearch={onSearch}
          placeholder="Search tasks..."
        />
      </div>
    </motion.header>
  );
};

export default HeaderWithLogout;