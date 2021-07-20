import Form from "../../common/Form";
import InstituteService from "../../../services/InstituteService";
import PageLoader from "../../common/PageLoader";
import DropdownList from "../../common/DropdownList";
import ErrorBox from "../../common/ErrorBox";
import InlineSpinner from "../../common/InlineSpinner";
import Input from "../../common/Input";
import Joi from "joi-browser";
import SubmitButton from "../../common/SubmitButton";
import DataListComponent from "../../common/DataList";

class Course extends Form {
  state = {
    data: { courseName: "", courseCategoryId: "" },
    DataList: [],
    DropdownListData: [],
    PageLoading: true,
    showErrorBox: false,
    spin: false,
    errors: {},
    deletedId: "",
    SaveLabel: "Add",
    inlineSpin: false,
    filteredCourseCategoryId: "",
  };
  schema = {
    courseName: Joi.string().required().label("Name"),
    courseCategoryId: Joi.string().required().label("Course Category"),
  };
  componentDidMount() {
    this.props.changeBreadCumbLinks("Courses", "institute/courses");
    this.getCourseCategoryList();
    this.getCourseList();
  }
  filterData = (e) => {
    this.setState({ filteredCourseCategoryId: e.currentTarget.value });
    this.setState({ inlineSpin: true });
    this.getCourseList(e.currentTarget.value);
  };
  ConfirmDelete = () => {
    InstituteService.DeleteCourse(this.state.deletedId)
      .then((response) => {
        console.log(response);
        if (response.success) {
          this.getCourseList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.state.deletedId);
  };
  getCourseCategoryList = () => {
    InstituteService.getCourseCategoryList().then((response) => {
      if (response.success) {
        if (response.data) {
          this.setState({
            DropdownListData: response.data,
          });
        }
      }
    });
  };
  getCourseList = (courseCategoryId = null) => {
    InstituteService.getCourseList(courseCategoryId)
      .then((response) => {
        if (response.success) {
          if (response.data) {
            this.setState({
              DataList: response.data,
            });
          } else {
            this.setState({
              DataList: [],
            });
          }
        } else {
          this.setState({ showErrorBox: true });
        }
        this.setState({
          PageLoading: false,
          inlineSpin: false,
        });
      })
      .catch((error) => {
        this.setState({
          PageLoading: false,
          showErrorBox: true,
          inlineSpin: false,
        });
      });
  };

  doSubmit = () => {
    this.setState({ spin: true });
    InstituteService.SaveCourse(this.state.data)
      .then((response) => {
        if (response.success) {
          this.getCourseList();
          this.setState({
            data: { courseName: "", courseCategoryId: "" },
            SaveLabel: "Add",
          });
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
            <span>Manage Courses</span>
          </div>

          <div className="card-body">
            {this.state.showErrorBox ? (
              <ErrorBox
                text="Course record loading failed."
                url="institute/courses"
              />
            ) : (
              <div className="row">
                <div className="col-8">
                  <div style={{ width: "20%" }}>
                    <DropdownList
                      name="courseCategoryId"
                      textField="name"
                      list={this.state.DropdownListData}
                      label="Filter Courses by category"
                      onchangeHandler={this.filterData}
                      valueParam={this.state.filteredCourseCategoryId ?? ""}
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
                    list={this.state.DataList}
                    listKeys={["courseName", "courseCategoryName"]}
                    headings={["Name", "Category Name"]}
                    editActionHandler={this.editActionHandler}
                    deleteActionHandler={this.deleteActionHandler}
                  />
                </div>
                <div className="col-4 border-box">
                  <h5>{this.state.SaveLabel + " Course"}</h5>
                  <form onSubmit={this.onSubmit}>
                    <DropdownList
                      name="courseCategoryId"
                      textField="name"
                      list={this.state.DropdownListData}
                      label="Select Course Category"
                      error={this.state.errors.courseCategoryId}
                      onchangeHandler={this.handleInputChange}
                      valueParam={this.state.data.courseCategoryId ?? ""}
                    />
                    <Input
                      name="courseName"
                      type="text"
                      label="Name"
                      value={this.state.data.courseName ?? ""}
                      handleInputChange={this.handleInputChange}
                      placeholder="Enter Name of the Course"
                      error={this.state.errors.courseName}
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

export default Course;
