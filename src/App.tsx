import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { LinkPage } from "./views/LinkPage";
import { HomePage } from "./views/HomePage";
import { MainLayout } from "./components/layout/MainLayout";
import { NoMatch } from "./components/utils/NaMatch";

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Routes>
          {/* Auth required */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="link" element={<LinkPage />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    );
  }
}
