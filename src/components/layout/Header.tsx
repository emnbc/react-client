import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { LocalStore } from "../../utils/local-store";

export const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    auth.logOut();
    LocalStore.setToken("");
    navigate("/login");
  };

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
    <Button
      onClick={() => {
        logOut();
      }}
      variant="secondary"
      size="sm"
      type="button"
    >
      Log Out
    </Button>
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
};

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
