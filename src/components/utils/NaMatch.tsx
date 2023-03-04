import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { style } from "typestyle";

export class NoMatch extends React.Component {
  render() {
    return (
      <div className={`container ${containerStyles}`}>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">
            <Button variant="success">Go to the home page</Button>
          </Link>
        </p>
      </div>
    );
  }
}

const containerStyles = style({
  paddingTop: "16px",
});
