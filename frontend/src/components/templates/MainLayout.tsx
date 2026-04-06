import { Outlet } from "react-router-dom";
import { Navbar } from "../organisms/Navbar/Navbar";

export const MainLayout = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
