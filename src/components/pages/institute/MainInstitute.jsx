import React from "react";
import BreadcrumbComponent from "../../common/Breadcrumb";
import SectionNavbar from "../../common/SectionNavbar";
import {
  faHome,
  faStoreAlt,
  faBookReader,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { Switch, Route } from "react-router-dom";
import Details from "./Details";
import Department from "./Department";
import Course from "./Course";
import Subject from "./Subject";
class MainInstitute extends React.Component {
  state = {
    breadCumbLinks: [{ text: "Institute", to: "/institute", active: false }],
    links: [
      {
        text: "Institute Details",
        to: "/institute",
        icon: faHome,
        componentAssigned: Details,
      },
      {
        text: "Departments",
        to: "/institute/departments",
        icon: faStoreAlt,
        componentAssigned: Department,
      },
      {
        text: "Courses",
        to: "/institute/courses",
        icon: faBookReader,
        componentAssigned: Course,
      },
      {
        text: "Subjects",
        to: "/institute/subjects",
        icon: faBookOpen,
        componentAssigned: Subject,
      },
    ],
  };
  changeBreadCumbLinks = (text, to) => {
    const b_links = [...this.state.breadCumbLinks];
    b_links[1] = { text: text, to: to, active: true };
    this.setState({ breadCumbLinks: b_links });
  };
  RenderRoutes = () => {
    return this.state.links.map((link, index) => {
      return (
        <Route
          exact
          key={index}
          path={link.to}
          render={() => (
            <link.componentAssigned
              changeBreadCumbLinks={this.changeBreadCumbLinks}
            />
          )}
        />
      );
    });
  };
  componentDidUpdate() {
    // console.log
  }
  render() {
    return (
      <>
        <BreadcrumbComponent
          urlProps={this.props.location}
          breadCumbLinks={this.state.breadCumbLinks}
        />
        <SectionNavbar
          links={this.state.links.filter((item) => item.to !== "/institute")}
          title="Manage Institute"
        />
        <Switch>{this.RenderRoutes()}</Switch>{" "}
      </>
    );
  }
}

export default MainInstitute;
