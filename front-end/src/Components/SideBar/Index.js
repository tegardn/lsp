import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

// import component
import Logo from "../Logo";
import Menu from "./Menu";

// import css
import "./style.css";

// import icon
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  const push = useNavigate();

  function logOut() {
    localStorage.removeItem("Authorization");
    push("/login");
  }

  return (
    <div className="sidebar">
      <div className="container-menu">
        <Logo />
        <Menu />
      </div>

      <div className="btn-logout" onClick={logOut}>
      <FontAwesomeIcon
            icon={faRightFromBracket}
            style={{ fontSize: "18px" }}
          />
        <h4>Log Out</h4>
      </div>
    </div>
  );
}
