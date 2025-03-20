import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
const MainLayout = () => {
    return (
        <div className="flex flex-col">
            <Header />
            <main>
            <Outlet></Outlet>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;