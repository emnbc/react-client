import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { LocalStore } from "../../utils/local-store";
import { style } from "typestyle";

export const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const logOut = () => {
    auth.logOut();
    LocalStore.setToken("");
    navigate("/login");
  };

  const toMain = () => {
    navigate("/");
  };

  const getFullName = () => {
    return `${auth.user?.firstName}!`;
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
    <div className={userBlockStyles}>
      <div className="text-white-50">Hello, {getFullName()}</div>
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
    </div>
  );

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <span className={`navbar-brand ${logoStyles}`} onClick={toMain}>
          React Client
        </span>
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
    name: "User List",
    path: "/user-list",
    disabled: false,
  },
  {
    name: "Disabled",
    path: "/disabled",
    disabled: true,
  },
];

const logoStyles = style({
  cursor: "pointer",
});

const userBlockStyles = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
});
