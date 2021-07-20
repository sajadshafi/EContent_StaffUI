import Form from "../../common/Form";
import BreadcrumbComponent from "../../common/Breadcrumb";
import AuthService from "../../../services/AuthService";
import ErrorBox from "../../common/ErrorBox";
import PageLoader from "../../common/PageLoader";
import ServerErrors from "../../common/ServerErrors";
import DataListComponent from "../../common/DataList";
import DropdownList from "../../common/DropdownList";
import InlineSpinner from "../../common/InlineSpinner";
import SubmitButton from "../../common/SubmitButton";
import Input from "../../common/Input";
import Joi from "joi-browser";
import InstituteService from "../../../services/InstituteService";
import { faToggleOn } from "@fortawesome/free-solid-svg-icons";
class UserManage extends Form {
  state = {
    breadCumbLinks: [{ text: "Users", to: "/manage-users", active: false }],
    users: [],
    ShowErrorBox: false,
    loading: true,
    data: { name: "", username: "", email: "", password: "", departmentId: "" },
    spin: false,
    errors: {},
    SaveLabel: "Add ",
    DropdownListData: [],
    ServerErrors: [],
    filteredDepartmentId: "",
    inlineSpin: false,
    deletedId: "",
  };
  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    departmentId: Joi.string().required().label("Department"),
  };
  changeBreadCumbLinks = (text, to) => {
    const b_links = [...this.state.breadCumbLinks];
    b_links[1] = { text: text, to: to, active: true };
    this.setState({ breadCumbLinks: b_links });
  };
  componentDidMount() {
    this.getDepartmentList();
    this.getTeacherUsersList();
  }
  filterData = (e) => {
    this.setState({ filteredDepartmentId: e.currentTarget.value });
    this.setState({ inlineSpin: true });
    this.getTeacherUsersList(e.currentTarget.value);
  };
  ConfirmDelete = () => {
    AuthService.DeleteUser(this.state.deletedId)
      .then((response) => {
        console.log(response);
        if (response.success) {
          this.getTeacherUsersList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getDepartmentList = () => {
    InstituteService.getDepartmentList().then((response) => {
      if (response.success) {
        if (response.data) {
          this.setState({
            DropdownListData: response.data,
          });
        }
      }
    });
  };
  getTeacherUsersList = (departmentId = null) => {
    AuthService.GetTeacherUsersList(departmentId)
      .then((response) => {
        console.log(response);
        if (response.success) {
          this.setState({
            users: response.data,
          });
        } else {
          this.setState({
            ShowErrorBox: true,
          });
        }
        this.setState({
          loading: false,
          inlineSpin: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  doSubmit = () => {
    this.setState({ spin: true });
    AuthService.RegisterUser(this.state.data)
      .then((response) => {
        if (response.success) {
          this.getTeacherUsersList();
          this.setState({
            data: {
              name: "",
              email: "",
              departmentId: "",
              password: "",
            },
            SaveLabel: "Add",
            ServerErrors: [],
          });
          this.showSuccessSwal(response.message);
        } else {
          this.setState({
            ServerErrors: response.errors,
          });
          this.showErrorSwal(response.message);
        }
        this.setState({ spin: false });
      })
      .catch((error) => {
        console.log(error);
        this.showErrorSwal(process.env.REACT_APP_ERRORMESSAGE);
        this.setState({ spin: false });
      });
  };

  render() {
    return (
      <>
        <BreadcrumbComponent
          urlProps={this.props.location}
          breadCumbLinks={this.state.breadCumbLinks}
        />
        {this.state.loading ? (
          <PageLoader />
        ) : (
          <div className="card">
            <div className="card-header">
              <span>User Management</span>
            </div>
            <div className="card-body">
              {this.state.ShowErrorBox ? (
                <ErrorBox text="Users loading failed" url="#/manage-users" />
              ) : (
                <div className="row">
                  <div className="col-8">
                    <div style={{ width: "20%" }}>
                      <DropdownList
                        name="departmentId"
                        textField="departmentName"
                        list={this.state.DropdownListData}
                        label="Filter Users by Department"
                        onchangeHandler={this.filterData}
                        valueParam={this.state.filteredDepartmentId ?? ""}
                      />{" "}
                      <InlineSpinner
                        styles={{
                          position: "absolute",
                          left: "200px",
                          top: "40px",
                        }}
                        spin={this.state.inlineSpin}
                      />
                    </div>
                    <DataListComponent
                      list={this.state.users}
                      listKeys={["name", "username", "email", "departmentName"]}
                      headings={[
                        "Name",
                        "Username",
                        "Email",
                        "Department Name",
                      ]}
                      editActionHandler={this.editActionHandler}
                      deleteActionHandler={this.deleteActionHandler}
                    />
                  </div>
                  <div className="col-4 border-box">
                    <h5>{this.state.SaveLabel + " User"}</h5>
                    <ServerErrors errors={this.state.ServerErrors} />
                    <form onSubmit={this.onSubmit}>
                      <DropdownList
                        name="departmentId"
                        textField="departmentName"
                        list={this.state.DropdownListData}
                        label="Select Department"
                        error={this.state.errors.departmentId}
                        onchangeHandler={this.handleInputChange}
                        valueParam={this.state.data.departmentId ?? ""}
                      />
                      <Input
                        name="name"
                        type="text"
                        label="Name"
                        value={this.state.data.name ?? ""}
                        handleInputChange={this.handleInputChange}
                        placeholder="Enter Name of the User"
                        error={this.state.errors.name}
                      />
                      <Input
                        name="username"
                        type="text"
                        label="Username"
                        value={this.state.data.username ?? ""}
                        handleInputChange={this.handleInputChange}
                        placeholder="Enter Username of the User"
                        error={this.state.errors.username}
                      />
                      <Input
                        name="email"
                        type="email"
                        label="Email"
                        value={this.state.data.email ?? ""}
                        handleInputChange={this.handleInputChange}
                        placeholder="Enter Email of the User"
                        error={this.state.errors.email}
                      />
                      <Input
                        name="password"
                        type="text"
                        label="Password"
                        value={this.state.data.password ?? ""}
                        handleInputChange={this.handleInputChange}
                        placeholder="Enter Password of the User"
                        error={this.state.errors.password}
                      />
                      <SubmitButton spin={this.state.spin} text="Save" />
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default UserManage;
