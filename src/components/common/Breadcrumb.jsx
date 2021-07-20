import Breadcrumb from "react-bootstrap/Breadcrumb";
import { NavLink } from "react-router-dom";
const BreadcrumbComponent = (props) => {
  const renderLinks = () => {
    if (props.breadCumbLinks) {
      return props.breadCumbLinks.map((link, index) => {
        if (link.active) {
          return (
            <Breadcrumb.Item key={index} active>
              {link.text}
            </Breadcrumb.Item>
          );
        } else {
          return (
            <Breadcrumb.Item
              key={index}
              linkAs={NavLink}
              linkProps={{ to: link.to }}
            >
              <span className="font-weight-bold link-text">{link.text}</span>
            </Breadcrumb.Item>
          );
        }
      });
    }
  };
  return (
    <div className="row">
      <div className="col-12">
        <Breadcrumb className="breadcrumb-wrapper">
          <Breadcrumb.Item linkAs={NavLink} linkProps={{ to: "/dashboard" }}>
            <span className="font-weight-bold link-text">Home</span>
          </Breadcrumb.Item>
          {renderLinks()}
        </Breadcrumb>
      </div>
    </div>
  );
};

export default BreadcrumbComponent;
