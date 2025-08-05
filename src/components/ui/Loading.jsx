import React from "react";
import { motion } from "framer-motion";

const Loading = ({ type = "tasks" }) => {
  if (type === "tasks") {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md animate-pulse mb-2" style={{ width: `${60 + Math.random() * 30}%` }} />
                  <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md animate-pulse" style={{ width: `${40 + Math.random() * 20}%` }} />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-16 h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse" />
                <div className="w-20 h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-md animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "categories") {
    return (
      <div className="space-y-3">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center space-x-3 p-3 rounded-lg"
          >
            <div className="w-5 h-5 bg-gradient-to-br from-gray-200 to-gray-300 rounded animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" style={{ width: `${50 + Math.random() * 30}%` }} />
            </div>
            <div className="w-6 h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse" />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full"
      />
    </div>
  );
};

export default Loading;