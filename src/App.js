import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import MainDashboard from "./components/pages/dashboard/MainDashboard";
import Header from "./components/parts/Header";
import Footer from "./components/parts/Footer";
import SideBar from "./components/parts/Sidebar";
import MainInstitute from "./components/pages/institute/MainInstitute";
import MainAllotment from "./components/pages/Allotment/MainAllotment";
import EContent from "./components/pages/EContent/EContent";
import UserManage from "./components/pages/UserManage/UserManage";
import AuthService from "./services/AuthService";
import PrivateRoute from "./components/pages/PrivateRoute";
import PageLoader from "./components/common/PageLoader";
import { ROLES } from "./utils/Constants";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    isLoaded: false,
    currentUser: {},
  };
  componentDidMount() {
    this.IsAuthenticated();
  }
  AuthenticateUser = (user) => {
    this.setState({ currentUser: user, isLoggedIn: true, isLoaded: true });
    //this.IsAuthenticated();
  };
  IsAuthenticated = () => {
    AuthService.IsAuthenticated()
      .then((response) => {
        this.setState({
          currentUser: response.data,
        });
        this.setState({
          isLoggedIn: true,
          isLoaded: true,
        });
      })
      .catch((error) => {
        this.setState({ isLoggedIn: false, isLoaded: true });
      });
  };
  RenderSidebar = () => {
    if (this.state.isLoggedIn)
      return <SideBar role={this.state.currentUser.role} />;
  };
  render() {
    return (
      <Router>
        <div className="container-fluid-custom">
          <Header
            isLoggedIn={this.state.isLoggedIn}
            currentUser={this.state.currentUser}
          />
          {this.state.isLoaded ? (
            <div className="content-wrapper">
              {this.RenderSidebar()}
              <div className="main-content container-fluid">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => {
                      return (
                        <Login
                          {...props}
                          isLoggedIn={this.state.isLoggedIn}
                          AuthenticateUser={this.AuthenticateUser}
                        />
                      );
                    }}
                  />
                  <PrivateRoute
                    path="/dashboard"
                    IsCorrectRole={true}
                    component={MainDashboard}
                    authenticated={this.state.isLoggedIn}
                  />
                  <PrivateRoute
                    path="/institute"
                    IsCorrectRole={
                      this.state.currentUser &&
                      this.state.currentUser.role === ROLES.ADMIN
                    }
                    component={MainInstitute}
                    authenticated={this.state.isLoggedIn}
                  />
                  {/* <PrivateRoute
                    path="/subject-allotment"
                    component={MainAllotment}
                    authenticated={this.state.isLoggedIn}
                  /> */}
                  <PrivateRoute
                    path="/manage-users"
                    IsCorrectRole={
                      this.state.currentUser &&
                      this.state.currentUser.role === ROLES.ADMIN
                    }
                    component={UserManage}
                    authenticated={this.state.isLoggedIn}
                  />
                  <PrivateRoute
                    path="/manage-content"
                    IsCorrectRole={
                      this.state.currentUser &&
                      this.state.currentUser.role === ROLES.TEACHER
                    }
                    component={EContent}
                    authenticated={this.state.isLoggedIn}
                  />
                </Switch>
              </div>
            </div>
          ) : (
            <div className="content-wrapper">
              <div className="main-content">
                <PageLoader />
              </div>
            </div>
          )}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
