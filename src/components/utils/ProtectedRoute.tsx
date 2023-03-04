import React from "react";
import { Route, RouteProps, Navigate } from "react-router-dom";

export class ProtectedRoute extends React.Component<RouteProps> {
  constructor(props: Readonly<RouteProps>) {
    super(props);
  }

  public render() {
    const authenticated = true; // auth condition

    if (authenticated) {
      return <Route {...this.props} />;
    } else {
      return <Navigate to={{ pathname: "/login" }} />;
    }
  }
}
