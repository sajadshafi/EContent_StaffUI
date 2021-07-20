import { NavLink } from "react-router-dom";
import "../../stylesheets/sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROLES } from "../../utils/Constants";
import {
  faChartArea,
  faUniversity,
  faCogs,
  faUserFriends,
  faFileUpload,
} from "@fortawesome/free-solid-svg-icons";
const SideBar = ({ role }) => {
  return (
    <div className="sidebar gray-700">
      <ul>
        <li>
          <NavLink to="/dashboard">
            <img
              alt="wiser logo"
              src="https://i.pravatar.cc/30"
              style={{ borderRadius: "100%" }}
            />
            <span className="roleNameText">
              {role} <span className="green-dot-color">●</span>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="sidebarLinkActive" to="/dashboard">
            <FontAwesomeIcon className="sidebar-icon" icon={faChartArea} />
            <span className="font-weight-bold link-text">Dashboard</span>
          </NavLink>
        </li>
        {role && role === ROLES.ADMIN ? (
          <>
            <li>
              <NavLink activeClassName="sidebarLinkActive" to="/institute">
                <FontAwesomeIcon className="sidebar-icon" icon={faUniversity} />
                <span className="font-weight-bold link-text">Institute</span>
              </NavLink>
            </li>
            {/* <li>
          <NavLink activeClassName="sidebarLinkActive" to="/subject-allotment">
            <FontAwesomeIcon className="sidebar-icon" icon={faCogs} />
            <span className="font-weight-bold link-text">Allotment</span>
          </NavLink>
        </li> */}
            <li>
              <NavLink activeClassName="sidebarLinkActive" to="/manage-users">
                <FontAwesomeIcon
                  className="sidebar-icon"
                  icon={faUserFriends}
                />
                <span className="font-weight-bold link-text">Users</span>
              </NavLink>
            </li>
          </>
        ) : (
          ""
        )}
        {role && role === ROLES.TEACHER ? (
          <li>
            <NavLink activeClassName="sidebarLinkActive" to="/manage-content">
              <FontAwesomeIcon className="sidebar-icon" icon={faFileUpload} />
              <span className="font-weight-bold link-text">E-Content</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default SideBar;
