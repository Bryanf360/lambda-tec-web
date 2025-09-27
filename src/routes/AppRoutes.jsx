import { Route, Routes } from "react-router-dom"

import { AdminRoutes } from "../admin/routes/AdminRoutes"
import { AuthRoutes } from "../auth/routes/AuthRoutes"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/*" element={<AuthRoutes />} />
        </Routes>
    )
}
