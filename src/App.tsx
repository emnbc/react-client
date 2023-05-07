import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { UserListPage } from "./views/UserListPage";
import { HomePage } from "./views/HomePage";
import { MainLayout } from "./components/layout/MainLayout";
import { NoMatch } from "./components/utils/NaMatch";
import { LoginPage } from "./views/LoginPage";
import { AuthProvider } from "./components/providers/AuthProvider";
import { AxiosInterceptor } from "./services/http";
import { ProtectedRoute } from "./components/utils/ProtectedRoute";

export default class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <AxiosInterceptor>
          <div className="app">
            <Routes>
              {/* Auth required */}
              <Route element={<MainLayout />}>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute element={<HomePage />} />
                  }
                />
                <Route
                  path="user-list"
                  element={
                    <ProtectedRoute element={<UserListPage />} />
                  }
                />
              </Route>
              <Route path="login" element={<LoginPage />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </AxiosInterceptor>
      </AuthProvider>
    );
  }
}
