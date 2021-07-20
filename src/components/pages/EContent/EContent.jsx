import React from "react";
import BreadcrumbComponent from "../../common/Breadcrumb";
import ContentForm from "../EContent/ContentForm";

class EContent extends React.Component {
  state = {
    breadCumbLinks: [
      { text: "E-Content", to: "/manage-content", active: false },
    ],
  };
  changeBreadCumbLinks = (text, to) => {
    const b_links = [...this.state.breadCumbLinks];
    b_links[1] = { text: text, to: to, active: true };
    this.setState({ breadCumbLinks: b_links });
  };

  render() {
    return (
      <>
        <BreadcrumbComponent
          urlProps={this.props.location}
          breadCumbLinks={this.state.breadCumbLinks}
        />

        <div className="card">
          <div className="card-header">
            <span>Manage Content</span>
          </div>
          <div className="card-body">
            <ContentForm />
          </div>
        </div>
      </>
    );
  }
}

export default EContent;
