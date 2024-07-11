import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Eror404 from "./pages/Eror404";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import LayoutWithNavbar from "./layouts/LayoutWithNavbar";
import LayoutWithoutNavbar from "./layouts/LayoutWithoutNavbar";
import Profile from "./pages/Profile";
import AddProducts from "./pages/AddProducts";

const router = createBrowserRouter([
    {
        path:"/",
        element:<LayoutWithNavbar/>,
        children:[
            {
                path: "/",
                element: <Home />
            },
            {
                path:"/cart",
                element:<Cart/>
            },
            {
                path:"/profile",
                element:<Profile/>
            }
        ]
    },
    {
        element:<LayoutWithoutNavbar/>,
        children:[
            {
                path: "/login",
                element: <Login />
            },
            
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/addproduct",
                element:<AddProducts/>

            },
            {
                path:"*",
                element:<Eror404/>        
            }
        ]
    }
    
])

export default router