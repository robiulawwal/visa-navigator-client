import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import AllVisa from "../pages/AllVisa";
import Home from "../components/Home";
import AddVisa from "../pages/AddVisa";
import PrivateAddVisa from "../pages/PrivateAddVisa";
import PrivateAllVisas from "../pages/PrivateAllVisas";
import VisaDetails from "../pages/VisaDetails";
import PrivateVisaDetails from "../pages/PrivateVisaDetails";
import MyVisas from "../pages/MyVisas";
import PrivateMyVisas from "../pages/PrivateMyVisas";
import MyApplications from "../pages/MyApplications";
import PrivateMyApplications from "../pages/PrivateMyApplications";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/all-visas',
                element: <PrivateAllVisas><AllVisa></AllVisa></PrivateAllVisas>,
                loader: () => fetch('http://localhost:5000/visas')
            },
            {
                path: '/add-visa',
                element: <PrivateAddVisa><AddVisa></AddVisa></PrivateAddVisa>

            },
            {
                path: '/visa-details/:id',
                element: <PrivateVisaDetails><VisaDetails></VisaDetails></PrivateVisaDetails>,
                loader:({params})=>fetch(`http://localhost:5000/visa-details/${params.id}`)
            },
            {
                path: '/my-visas',
                element: <PrivateMyVisas><MyVisas></MyVisas></PrivateMyVisas>,
                loader: () => fetch('http://localhost:5000/visas')
            },
            {
                path: '/my-applications',
                element:<PrivateMyApplications><MyApplications></MyApplications></PrivateMyApplications>,
            },
        ]

    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])
export default router