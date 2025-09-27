import { Navigate, Route, Routes } from "react-router"

import { 
    DashboardPage,
    InputsPage, 
    OutputsPage, 
    ProductsPage, 
    UsersPage,
    AdminLayoutPage,
} from "../pages"

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayoutPage />}>
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
