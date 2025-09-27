import { Navigate, Route, Routes } from "react-router-dom"

import { AuthPage } from "../pages"

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<AuthPage />} />
            <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
    )
}
