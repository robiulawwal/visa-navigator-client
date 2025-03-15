import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import Login from "../components/Login";
import Register from "../components/Register";

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children:[
            {
               path:'/login',
               element:<Login></Login> 
            },
            {
               path:'/register',
               element:<Register></Register>
            }
        ]
        
    },
    {
        path:'*',
        element:<ErrorPage></ErrorPage>
    }
])
export default router