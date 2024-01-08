import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
import "./styles/font.css";
import AdminTable from "./components/adminModule/adminTable/AdminTable";
import AdminDashboard from "./components/adminModule/adminDashboard/AdminDashboard";
import AdminPaymentsComponent from "./components/adminModule/adminPayments/AdminPaymentsComponent";
import AdminMenuComponent from "./components/adminModule/adminMenu/AdminMenuComponent";
import AdminUsersComponent from "./components/adminModule/adminUsers/AdminUsersComponent";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CustomToast from "./components/atoms/CustomToast/CustomToast";
import { ToastProvider } from "react-toast-notifications";
import TableSelection from "./components/usersModule/tableSelection/TableSelection";
// import PaymentPage2 from "./components/usersModule/paymentPage/PaymentPage2";

import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import ThankyouPage from "./components/usersModule/thankyouPage/ThankyouPage";
import LoginComponent from "./components/auth/login/LoginComponent";
import RegisterComponent from "./components/auth/register/RegisterComponent";
import ForgotPassword from "./components/auth/forgotPassword/ForgotPassword";
import Layout from "./layout/Layout";
import OrdersPage from "./components/usersModule/ordersPage/OrdersPage";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import PaymentPage from "./components/usersModule/paymentPage/PaymentPage";
import { useSelector } from "react-redux";

// const PaymentPage2 = lazy(() =>
//   import("./components/usersModule/paymentPage/PaymentPage2")
// );
function App() {
  const queryClient = new QueryClient();
  const userRole = useSelector((state) => state.user.role);
  return (
    <BrowserRouter>
      <div className="App">
        <ToastProvider
          components={{ Toast: CustomToast }}
          placement="top-right"
          autoDismissTimeout={1500}
          autoDismiss
          id="toaster"
          transitionDuration={4}
        >
          <Layout />
          <div className="MainDiv">
            <Routes>
              <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route
                  path="/admin/table"
                  element={
                    <QueryClientProvider client={queryClient}>
                      <AdminTable />
                    </QueryClientProvider>
                  }
                />
                <Route path="/admin/users" element={<AdminUsersComponent />} />
                <Route
                  path="/admin/payments"
                  element={<AdminPaymentsComponent />}
                />
                <Route path="/admin/menu" element={<AdminMenuComponent />} />
              </Route>
              <Route element={<ProtectedRoutes allowedRoles={["user"]} />}>
                <Route path="/user/thankyou" element={<ThankyouPage />} />
                <Route path="/user/table" element={<TableSelection />} />
                <Route
                  path="/user/payment"
                  element={
                    // <Suspense fallback={<div>Loading...</div>}>
                    <PaymentPage />
                    // </Suspense>
                  }
                />
                <Route path="/user/thankyou" element={<ThankyouPage />} />
              </Route>
              <Route
                path="/"
                element={
                  <Navigate
                    to={
                      userRole === "admin"
                        ? "/admin/dashboard"
                        : userRole === "user"
                        ? "/user/table"
                        : "/user/orders"
                    }
                    replace
                  />
                }
              />
              <Route path="/user/orders" element={<OrdersPage />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/register" element={<RegisterComponent />} />
              <Route path="/changepassword" element={<ForgotPassword />} />
              {/* <Route path="/verifyotp" element={<OtpComponent />} /> */}
            </Routes>
          </div>
        </ToastProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
