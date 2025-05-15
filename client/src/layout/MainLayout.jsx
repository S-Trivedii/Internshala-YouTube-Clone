import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Siderbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  // Lifting the state, since both sidebar component and header component can't share the state. I have to lift the state to Parent component that is MainLayout to share the state b/w the two sibling components
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <div className="flex-shrink-0">
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Content section: Sidebar + Scrollable Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <Sidebar isCollapsed={isCollapsed} />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
