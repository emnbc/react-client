import React from "react";
import { style } from "typestyle";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

interface MainProps {

}

interface MainState {
  isLoading: boolean;
  isAuth: boolean;
}

export class MainLayout extends React.Component<MainProps, MainState> {

  componentDidMount(): void {
    console.log('MainLayout componentDidMount');
  }

  render() {
    return (
      <>
        <Header />
        <div className={`container ${containerStyles}`}>
          <Outlet />
        </div>
      </>
    );
  }
}

const containerStyles = style({
  paddingTop: "16px",
});
