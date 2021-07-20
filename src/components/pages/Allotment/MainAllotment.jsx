import React from "react";
import AllotSubject from "./AllotSubject";
import BreadcrumbComponent from "../../common/Breadcrumb";

class MainAllotment extends React.Component {
  state = {
    breadCumbLinks: [
      { text: "Allotment", to: "/subject-allotment", active: false },
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
            <span>Subject Allotment</span>
          </div>
          <div className="card-body">
            <AllotSubject />
          </div>
        </div>
      </>
    );
  }
}

export default MainAllotment;
