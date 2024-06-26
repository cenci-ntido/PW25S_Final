import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { UserSignupPage} from "@/pages/UserSignUpPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { AccountListPage } from "@/pages/AccountListPage";
import { AccountFormPage } from "@/pages/AccountForm";
import { TransactionListPage } from "@/pages/TransactionListPage";
import { TransactionForm } from "@/pages/TransactionForm";

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
                    <Route path="/accounts/new" element={<AccountFormPage />} />
                    <Route path="/accounts/:id" element={<AccountFormPage />} />

                <Route path="/transactions" element={<TransactionListPage />} />
                <Route path="/transactions/new" element={<TransactionForm />} />
                <Route path="/transactions/:id" element={<TransactionListPage />} />

            </Route>
        </Routes>
    </>
  )
}
