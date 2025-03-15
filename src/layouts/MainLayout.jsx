import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4">
            <Outlet></Outlet>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;