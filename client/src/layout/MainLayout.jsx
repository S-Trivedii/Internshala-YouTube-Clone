import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
