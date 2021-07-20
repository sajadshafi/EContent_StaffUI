import { NavDropdown } from "react-bootstrap";
import "../../stylesheets/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header = ({ isLoggedIn, currentUser }) => {
  const { name, role } = currentUser;

  const Logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };

  const RenderDropdown = () => {
    if (isLoggedIn) {
      return (
        <NavDropdown
          bg="light"
          className="float-right logout-action"
          title={
            <div className="user-profile">
              <FontAwesomeIcon
                style={{ fontSize: "19px" }}
                className="text-white u"
                icon={faUserCircle}
              />
              <div className="text-white username-text u">
                <p>{name}</p>
                <p style={{ fontSize: "11px" }}> {role} </p>
              </div>
              <FontAwesomeIcon className="text-white u" icon={faChevronDown} />
            </div>
          }
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item href="#action/3.2">My Profile</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.1">
            Change Password
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={Logout} href="">
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      );
    }
  };
  return (
    <div className="container-fluid bg-primary">
      <img src="/images/wiserlogo.png" alt="wiser logo" />
      {RenderDropdown()}
    </div>
  );
};

export default Header;
