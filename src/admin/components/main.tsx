import Nav from "./nav";
import { Outlet } from "react-router-dom";
import PanelRoutes from "../routes/panelRoutes";
import Footer from "./footer";

function Main() {
  return (
    <>
      <Nav />
      <main>
        <PanelRoutes />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Main;
