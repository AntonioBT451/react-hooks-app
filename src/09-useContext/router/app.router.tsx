import { createBrowserRouter, Navigate } from "react-router";
import { AboutPage } from '../pages/about/AboutPage';
import { ProfilePage } from "../pages/profile/ProfilePage";
import { LoginPage } from "../pages/auth/LoginPage";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AboutPage />,
    },
    {
        path: "/profile",
        element: <PrivateRouter element={<ProfilePage />} />,
    },
    {
        path: "/login",
        element: <PublicRouter element={<LoginPage />} />,
    },
    {
        path: "*",
        element: <Navigate to={"/"} />,
    },
]);
