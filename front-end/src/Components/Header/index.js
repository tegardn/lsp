import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// import component
import Logo from "../Logo";

// import css
import "./style.css";

// import icon
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  // bahan
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState("");
    const token = localStorage.getItem('Authorization');
    const push = useNavigate();

    // proses tampil user
    async function getProfile() {
        try {
            const res = await axios.get("http://localhost:8000/profile", {
              headers: {
                "Authorization" : `Bearer ${token}`
              }
            })
            setUser(res.data.message.nama)
          } catch (err) {
            console.log(err);
          }
    }

    // proses log out
    function logOut() {
        localStorage.removeItem("Authorization");
        push("/login");
      }

  // proses modal
  function modal() {
    setShowModal(!showModal);
    }
    
    useEffect(() => {
        getProfile()
    }, [token])

  return (
    <header>
      <Link to='/'>
        <Logo />
      </Link>
      <div className="profile-customer" onClick={modal}>
        <FontAwesomeIcon
          icon={faUser}
          style={{ color: "#7f5af0", fontSize: "30px" }}
        />
      </div>
      {showModal ? (
        <div className="m-content">
          <div className="m-p-name">
            <h2>{user}</h2>
          </div>
          <ul>
            <li onClick={logOut}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                style={{ fontSize: "18px", color: "#7f5af0" }}
              />
              Log Out
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
