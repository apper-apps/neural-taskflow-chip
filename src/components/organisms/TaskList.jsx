import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskCard from "@/components/molecules/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const TaskList = ({ 
  tasks, 
  categories, 
  loading, 
  error, 
  onTaskUpdate, 
  onTaskDelete, 
  onEditTask, 
  onRetry,
  emptyType = "tasks",
  onAddTask
}) => {
  if (loading) {
    return <Loading type="tasks" />;
  }

  if (error) {
    return (
      <Error 
        type="tasks"
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Empty 
        type={emptyType}
        onAction={onAddTask}
        actionLabel="Add New Task"
      />
    );
  }

  return (
    <div className="space-y-4">
<AnimatePresence mode="popLayout">
        {tasks.map(task => {
          const category = categories.find(cat => cat.Id === (task.categoryId?.Id || task.categoryId));
          
          return (
            <motion.div
              key={task.Id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="group"
            >
              <TaskCard
                task={task}
                category={category}
                onTaskUpdate={onTaskUpdate}
                onTaskDelete={onTaskDelete}
                onEditTask={onEditTask}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;