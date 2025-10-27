import { useEffect } from "react";
import { BrowserRouter as Router, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { ConfigProvider, App as AntdApp } from "antd";
import { store } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getUser } from "./store/slices/authSlice";
// import LoginPage from "./pages/auth/Login";
// import RegisterPage from "./pages/RegisterPage";
// import DashboardPage from "./pages/DashboardPage";
// import FormBuilderPage from "./pages/FormBuilderPage";
// import ProtectedRoute from "./components/ProtectedRoute";
import "./App.scss";
import "antd/dist/reset.css";
import router from "./pages";

function AppContent() {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getUser());
    }
  }, [dispatch, token, user]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#035F5B",
          borderRadius: 5,
        },
      }}
    >
      <AntdApp>
        {/* <div className="app">
            <Routes>
              <Route
                path="/login"
                element={
                  user ? <Navigate to="/dashboard" replace /> : <LoginPage />
                }
              />
              <Route
                path="/register"
                element={
                  user ? <Navigate to="/dashboard" replace /> : <RegisterPage />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/builder"
                element={
                  <ProtectedRoute>
                    <FormBuilderPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/builder/:id"
                element={
                  <ProtectedRoute>
                    <FormBuilderPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div> */}
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
