import { Navigate, Route, Routes } from "react-router"

import { 
    DashboardPage,
    InputsPage, 
    OutputsPage, 
    ProductsPage, 
    UsersPage
} from "../pages"

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="inputs" element={<InputsPage />} />
            <Route path="outputs" element={<OutputsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="*" element={<Navigate to="dashboard" />} />
        </Routes>
    )
}
