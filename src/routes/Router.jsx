import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/ErrorPage";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App></App>
    },
    {
        path:'*',
        element:<ErrorPage></ErrorPage>
    }
])
export default router