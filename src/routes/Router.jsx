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

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
               path:'/login',
               element:<Login></Login> 
            },
            {
               path:'/register',
               element:<Register></Register>
            },
            {
                path:'/all-visas',
                element:<AllVisa></AllVisa>,
           loader:()=>fetch('http://localhost:5000/visas')
            },
            {
                path:'/add-visa',
                element:<PrivateAddVisa><AddVisa></AddVisa></PrivateAddVisa>
           
            }
        ]
        
    },
    {
        path:'*',
        element:<ErrorPage></ErrorPage>
    }
])
export default router