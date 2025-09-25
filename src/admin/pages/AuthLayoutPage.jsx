import { Outlet } from "react-router"
import { Sidebar } from "../components"

export const AuthLayoutPage = () => {
    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}
