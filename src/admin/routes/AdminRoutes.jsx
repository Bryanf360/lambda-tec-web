import { Navigate, Route, Routes } from "react-router-dom"

import { 
    DashboardPage,
    InputsPage, 
    OutputsPage, 
    ProductsPage, 
    UsersPage,
} from "../pages"
import { AdminLayout } from "../components"

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="inputs" element={<InputsPage />} />
                <Route path="outputs" element={<OutputsPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" />} />
            </Route>
        </Routes>
    )
}
