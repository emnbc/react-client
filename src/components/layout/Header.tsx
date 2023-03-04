import React from "react";
import { NavLink } from "react-router-dom";

export class Header extends React.Component {
  render() {
    const listMenu = menuItems.map((item, index) => (
      <li className="nav-item" key={index}>
        <NavLink
          to={item.path}
          aria-current="page"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""} ${
              item.disabled ? "disabled" : ""
            }`
          }
        >
          {item.name}
        </NavLink>
      </li>
    ));

    const form = (
      <form role="search">
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>
    );

    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            React Client
          </a>
          <div className="navbar-collapse">
            <ul className="navbar-nav me-auto mb-0">{listMenu}</ul>
            {form}
          </div>
        </div>
      </nav>
    );
  }
}

const menuItems = [
  {
    name: "Home",
    path: "/",
    disabled: false,
  },
  {
    name: "Link",
    path: "/link",
    disabled: false,
  },
  {
    name: "Disabled",
    path: "/disabled",
    disabled: true,
  },
];
