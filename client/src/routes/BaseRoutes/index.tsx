import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { UserSignupPage} from "@/pages/UserSignUpPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { AccountListPage } from "@/pages/AccountListPage";
// import { AccountFormPage } from "@/pages/AccountFormPage";
import { ProductListPage } from "@/pages/ProductListPage";
import { ProductFormPage } from "@/pages/ProductFormPage";
import { ProductListPageV2 } from "@/pages/ProductListPageV2";
import { ProductFormPageV2 } from "@/pages/ProductFormPageV2";

export function BaseRoutes() {
  return (
    <>
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<UserSignupPage />} />

            {/* Protected Routes */}
            <Route element={<AuthenticatedRoutes />}>
                <Route path="/" element={<HomePage />} />

                <Route path="/accounts" element={<AccountListPage />} />
                    {/*<Route path="/accounts/new" element={<AccountFormPage />} />*/}
                    {/*<Route path="/accounts/:id" element={<AccountFormPage />} />*/}

                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/new" element={<ProductFormPage />} />
                <Route path="/products/:id" element={<ProductFormPage />} />

                <Route path="/products-v2" element={<ProductListPageV2 />} />

                <Route path="/products-v2/new" element={<ProductFormPageV2 />} />
                <Route path="/products-v2/:id" element={<ProductFormPageV2 />} />
            </Route>
        </Routes>
    </>
  )
}
