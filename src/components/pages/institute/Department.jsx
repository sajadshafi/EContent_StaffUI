import Form from "../../common/Form";
import InstituteService from "../../../services/InstituteService";
import PageLoader from "../../common/PageLoader";
import ErrorBox from "../../common/ErrorBox";
import Input from "../../common/Input";
import Joi from "joi-browser";
import SubmitButton from "../../common/SubmitButton";
import DataListComponent from "../../common/DataList";

class Department extends Form {
  state = {
    data: { departmentName: "" },
    DataList: [],
    PageLoading: true,
    showErrorBox: false,
    spin: false,
    errors: {},
    deletedId: "",
    SaveLabel: "Add",
  };
  schema = {
    departmentName: Joi.string().required().label("Name"),
  };
  componentDidMount() {
    this.props.changeBreadCumbLinks("Departments", "institute/department");
    this.getDepartmentList();
  }
  ConfirmDelete = () => {
    InstituteService.DeleteDepartment(this.state.deletedId)
      .then((response) => {
        console.log(response);
        if (response.success) {
          this.getDepartmentList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.state.deletedId);
  };
  getDepartmentList = () => {
    InstituteService.getDepartmentList()
      .then((response) => {
        if (response.success) {
          if (response.data) {
            this.setState({
              DataList: response.data,
            });
          }
        } else {
          this.setState({ showErrorBox: true });
        }
        this.setState({
          PageLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          PageLoading: false,
          showErrorBox: true,
        });
      });
  };

  doSubmit = () => {
    this.setState({ spin: true });
    InstituteService.SaveDepartment(this.state.data)
      .then((response) => {
        if (response.success) {
          this.getDepartmentList();
          this.setState({ data: { departmentName: "" }, SaveLabel: "Add" });
          this.showSuccessSwal(response.message);
        } else {
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
    if (this.state.PageLoading) {
      return (
        <div className="loaderWrapper">
          <PageLoader />
        </div>
      );
    } else {
      return (
        <div className="card mt-2">
          <div className="card-header">
            <span>Manage Departments</span>
          </div>

          <div className="card-body">
            {this.state.showErrorBox ? (
              <ErrorBox
                text="Department record loading failed."
                url="institute/departments"
              />
            ) : (
              <div className="row">
                <div className="col-8">
                  <DataListComponent
                    list={this.state.DataList}
                    listKeys={["departmentName"]}
                    headings={["Name"]}
                    editActionHandler={this.editActionHandler}
                    deleteActionHandler={this.deleteActionHandler}
                  />
                </div>
                <div className="col-4 border-box">
                  <h5>{this.state.SaveLabel + " Department"}</h5>
                  <form onSubmit={this.onSubmit}>
                    <Input
                      name="departmentName"
                      type="text"
                      label="Name"
                      value={this.state.data.departmentName ?? ""}
                      handleInputChange={this.handleInputChange}
                      placeholder="Enter Name of the Department"
                      error={this.state.errors.departmentName}
                    />
                    <SubmitButton spin={this.state.spin} text="Save" />
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default Department;
