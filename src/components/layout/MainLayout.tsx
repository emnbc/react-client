import React from "react";
import { style } from "typestyle";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header";

export class MainLayout extends React.Component {
  render() {
    const isAuth = true;  // auth condition

    if (isAuth) {
      return (
        <>
          <Header />
          <div className={`container ${containerStyles}`}>
            <Outlet />
          </div>
        </>
      );
    } else {
      return <Navigate to="/login" />;
    }
  }
}

const containerStyles = style({
  paddingTop: "16px",
});
