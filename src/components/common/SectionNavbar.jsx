import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SectionNavbar = (props) => {
  const RenderLinks = () => {
    if (props) {
      return props.links.map((link, index) => {
        return (
          <Nav.Link
            key={index}
            activeClassName="nav-link-active"
            as={NavLink}
            to={link.to}
          >
            <FontAwesomeIcon icon={link.icon} /> {link.text}
          </Nav.Link>
        );
      });
    }
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="color-5" variant="dark">
      <span style={{ backgroundColor: "#fff" }}>
        <Navbar.Brand className="navbar-bar-brand">{props.title}</Navbar.Brand>
      </span>
      <Nav className="mr-auto">{RenderLinks()}</Nav>
    </Navbar>
  );
};
export default SectionNavbar;
