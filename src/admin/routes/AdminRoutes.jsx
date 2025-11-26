import { Navigate, Route, Routes } from "react-router-dom"

import { 
    DashboardPage,
    InputsPage, 
    OutputsPage, 
    ProductDetailsPage, 
    ProductsPage, 
    ReportsPage, 
    UsersPage,
} from "../pages"
import { AdminLayout } from "../components"

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="product-details/:id" element={<ProductDetailsPage />} />
                <Route path="inputs" element={<InputsPage />} />
                <Route path="outputs" element={<OutputsPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
        </Routes>
    )
}
