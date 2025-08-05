import React, { useState } from "react";
import Sidebar from "@/components/organisms/Sidebar";

const Layout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen}
        onMobileToggle={toggleMobileSidebar}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        {React.cloneElement(children, { 
          onMobileMenuToggle: toggleMobileSidebar 
        })}
      </div>
    </div>
  );
};

export default Layout;