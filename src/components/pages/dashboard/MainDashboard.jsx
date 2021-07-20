import React from "react";
import PageLoader from "../../common/PageLoader";

class MainDashboard extends React.Component {
  state = {
    loaded: true,
  };
  render() {
    if (this.state.loaded) return <h1>Main Dashboard</h1>;
    else return <PageLoader />;
  }
}

export default MainDashboard;
