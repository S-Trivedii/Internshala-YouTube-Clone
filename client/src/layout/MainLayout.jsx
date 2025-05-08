import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Siderbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  // Lifting the state, since both sidebar component and header component can't share the state. I have to lift the state to Parent component that is MainLayout to share the state b/w the two sibling components
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      {/* Only at root route  */}
      <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex">
        <Sidebar isCollapsed={isCollapsed} />

        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
