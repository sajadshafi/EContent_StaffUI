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

class Subject extends Form {
  state = {
    data: {
      subjectName: "",
      subjectCode: "",
      numberOfSeats: "",
      semesterNo: "",
      subjectCategoryId: "",
      departmentId: "",
    },
    DataList: [],
    DropdownListData: [],
    DropdownListData1: [],
    PageLoading: true,
    showErrorBox: false,
    spin: false,
    errors: {},
    deletedId: "",
    SaveLabel: "Add",
    inlineSpin: false,
    filteredCategoryId: "",
    filteredDepartmentId: "",
    filteredSemester: 0,
    semesterData: [],
  };
  schema = {
    subjectName: Joi.string().required().label("Name"),
    semesterNo: Joi.number()
      .integer()
      .required()
      .min(1)
      .max(10)
      .label("Semester"),
    subjectCode: Joi.string().required().label("Subject Code"),
    numberOfSeats: Joi.number().required().label("Number of Seats"),
    subjectCategoryId: Joi.string().required().label("Subject Category"),
    departmentId: Joi.string().required().label("Department"),
  };
  componentDidMount() {
    this.props.changeBreadCumbLinks("Subjects", "institute/subjects");
    this.setSemesterData();
    this.getSubjectCategoryList();
    this.getDepartmentList();
    this.getSubjectList();
  }
  setSemesterData = () => {
    let semesterData = [];
    for (let i = 1; i <= 10; i++) {
      let obj = { text: "Semester " + i, id: i };
      semesterData.push(obj);
    }
    this.setState({
      semesterData: semesterData,
    });
  };
  filterSemester = (e) => {
    this.setState({ inlineSpin: true });
    this.setState({
      filteredSemester: e.currentTarget.value ? e.currentTarget.value : 0,
    });
    this.getSubjectList(
      this.state.filteredCategoryId,
      this.state.filteredDepartmentId,
      e.currentTarget.value ? e.currentTarget.value : 0
    );
  };
  filterData = (e) => {
    this.setState({ inlineSpin: true });
    this.setState({ filteredCategoryId: e.currentTarget.value });

    this.getSubjectList(
      e.currentTarget.value,
      this.state.filteredDepartmentId,
      this.state.filteredSemester
    );
  };
  filterData1 = (e) => {
    this.setState({ inlineSpin: true });
    this.setState({ filteredDepartmentId: e.currentTarget.value });
    this.getSubjectList(
      this.state.filteredCategoryId,
      e.currentTarget.value,
      this.state.filteredSemester
    );
  };
  ConfirmDelete = () => {
    InstituteService.DeleteSubject(this.state.deletedId)
      .then((response) => {
        console.log(response);
        if (response.success) {
          this.getSubjectList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.state.deletedId);
  };
  getSubjectCategoryList = () => {
    InstituteService.getSubjectCategoryList().then((response) => {
      if (response.success) {
        if (response.data) {
          this.setState({
            DropdownListData: response.data,
          });
        }
      }
    });
  };
  getDepartmentList = () => {
    InstituteService.getDepartmentList().then((response) => {
      if (response.success) {
        if (response.data) {
          this.setState({
            DropdownListData1: response.data,
          });
        }
      }
    });
  };
  getSubjectList = (CategoryId = "", DepartmentId = "", semesterNo = 0) => {
    InstituteService.getSubjectList(CategoryId, DepartmentId, semesterNo)
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
    InstituteService.SaveSubject(this.state.data)
      .then((response) => {
        if (response.success) {
          this.getSubjectList();
          this.setState({
            data: {
              subjectName: "",
              subjectCode: "",
              numberOfSeats: "",
              subjectCategoryId: "",
              departmentId: "",
              semesterNo: "",
            },
            SaveLabel: "Add",
          });
          this.showSuccessSwal(response.message);
        } else {
          this.showErrorSwal(response.message);
        }
        this.setState({ spin: false });
      })
      .catch((error) => {
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
            <span>Manage Subjects</span>
          </div>

          <div className="card-body">
            {this.state.showErrorBox ? (
              <ErrorBox
                text="Subect Record loading failed"
                url="institute/subjects"
              />
            ) : (
              <div className="row">
                <div className="col-8">
                  <div>
                    <div className="row">
                      <div className="col-4">
                        <DropdownList
                          name="subjectCategoryId"
                          textField="name"
                          list={this.state.DropdownListData}
                          label="Filter Subjects by category"
                          onchangeHandler={this.filterData}
                          valueParam={this.state.filteredCategoryId ?? ""}
                        />
                      </div>
                      <div className="col-4">
                        <DropdownList
                          name="departmentId"
                          textField="departmentName"
                          list={this.state.DropdownListData1}
                          label="Filter Subjects by Department"
                          onchangeHandler={this.filterData1}
                          valueParam={this.state.filteredDepartmentId ?? ""}
                        />
                      </div>
                      <div className="col-4">
                        <DropdownList
                          name="semesterNo"
                          textField="text"
                          list={this.state.semesterData}
                          label="Filter Subjects by Semester"
                          onchangeHandler={this.filterSemester}
                          valueParam={this.state.filteredSemester ?? 0}
                        />
                      </div>{" "}
                      <InlineSpinner
                        styles={{
                          marginLeft: "21px",
                          marginBottom: "12px",
                        }}
                        spin={this.state.inlineSpin}
                      />
                    </div>
                  </div>
                  <DataListComponent
                    list={this.state.DataList}
                    listKeys={[
                      "subjectCategoryName",
                      "subjectName",
                      "subjectCode",
                      "semesterNo",
                      "numberOfSeats",
                      "departmentName",
                    ]}
                    headings={[
                      "Subject Category",
                      "Subject Name",
                      "Subject Code",
                      "Semester No",
                      "Number of Seats",
                      "Department Name",
                    ]}
                    editActionHandler={this.editActionHandler}
                    deleteActionHandler={this.deleteActionHandler}
                  />
                </div>
                <div className="col-4 border-box">
                  <h5>{this.state.SaveLabel + " Subject"}</h5>
                  <form onSubmit={this.onSubmit}>
                    <DropdownList
                      name="subjectCategoryId"
                      textField="name"
                      list={this.state.DropdownListData}
                      label="Select Subject Category"
                      error={this.state.errors.subjectCategoryId}
                      onchangeHandler={this.handleInputChange}
                      valueParam={this.state.data.subjectCategoryId ?? ""}
                    />
                    <DropdownList
                      name="departmentId"
                      textField="departmentName"
                      list={this.state.DropdownListData1}
                      label="Select Department"
                      error={this.state.errors.departmentId}
                      onchangeHandler={this.handleInputChange}
                      valueParam={this.state.data.departmentId ?? ""}
                    />
                    <Input
                      name="semesterNo"
                      type="text"
                      label="Semester No."
                      value={this.state.data.semesterNo ?? ""}
                      handleInputChange={this.handleInputChange}
                      placeholder="Enter Semester No. (value 1 to 10)"
                      error={this.state.errors.semesterNo}
                    />
                    <Input
                      name="subjectName"
                      type="text"
                      label="Name"
                      value={this.state.data.subjectName ?? ""}
                      handleInputChange={this.handleInputChange}
                      placeholder="Enter Name of the Subject"
                      error={this.state.errors.subjectName}
                    />
                    <Input
                      name="subjectCode"
                      type="text"
                      label="Subject Code"
                      value={this.state.data.subjectCode ?? ""}
                      handleInputChange={this.handleInputChange}
                      placeholder="Enter Code of the Subject"
                      error={this.state.errors.subjectCode}
                    />
                    <Input
                      name="numberOfSeats"
                      type="number"
                      label="Number of Seats"
                      value={this.state.data.numberOfSeats ?? ""}
                      handleInputChange={this.handleInputChange}
                      placeholder="Enter Number of Seats"
                      error={this.state.errors.numberOfSeats}
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

export default Subject;
