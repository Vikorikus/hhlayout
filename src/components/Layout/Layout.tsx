import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";

export const Layout = () => {
  return (
    <div style={{ backgroundColor: "#F6F6F7", minHeight: "100vh" }}>
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
};
