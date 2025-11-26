import { useEffect } from "react"

import { Route, Routes } from "react-router-dom"

import { AdminRoutes } from "../admin/routes/AdminRoutes"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useAuthStore } from "../auth/hooks/useAuthStore"

export const AppRoutes = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        <Routes>
            {status === 'authenticated' ? (
                <Route path="/*" element={<AdminRoutes />} />
            ) : (
                <Route path="/*" element={<AuthRoutes />} />
            )}
        </Routes>
    )
}
