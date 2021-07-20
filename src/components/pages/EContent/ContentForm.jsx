import Form from "../../common/Form";
import InstituteService from "../../../services/InstituteService";
import PageLoader from "../../common/PageLoader";
import ErrorBox from "../../common/ErrorBox";
import AddUpdateContent from "./AddUpdateContent";
import AddUpdateSubject from "../institute/AddUpdateSubject";
import ContentService from "../../../services/ContentService";
import DataListComponent from "../../common/DataList";
import moment from "moment";

class ContentForm extends Form {
  state = {
    data: {
      subjectId: "",
      title: "",
      content: "",
      courseId: "",
      unit: "",
      eFileVMs: [],
    },
    DataList: [],
    DropdownListData: [],
    DropdownListData1: [],
    CourseCategoryList: [],
    CourseList: [],
    PageLoading: true,
    showErrorBox: false,
    spin: false,
    deletedId: "",
    SaveLabel: "Add",
    inlineSpin: false,
    filteredCategoryId: "",
    filteredDepartmentId: "",
    filteredSemester: 0,
    semesterData: [],
    showForms: false,
    contentData: [],
  };
  contentEditActionHandler = (item) => {
    this.setState({ data: item, showForms: true });
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

  componentDidMount() {
    // this.props.changeBreadCumbLinks("Subjects", "institute/subjects");
    this.getSubjectCategoryList();
    this.getCourseCategoryList();
    this.getCourseList();
    this.getDepartmentList();
    this.setSemesterData();
    this.getSubjectList();
    this.getContentData();
  }

  getCourseCategoryList = () => {
    InstituteService.getCourseCategoryList().then((response) => {
      if (response.success) {
        if (response.data) {
          this.setState({
            CourseCategoryList: response.data,
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
              CourseList: response.data,
            });
          } else {
            this.setState({
              CourseList: [],
            });
          }
        } else {
          this.setState({ showErrorBox: true });
        }
        this.setState({
          inlineSpin: false,
        });
      })
      .catch((error) => {
        this.setState({
          showErrorBox: true,
          inlineSpin: false,
        });
      });
  };
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
            let modifiedData = response.data.map((item) => {
              const subject = { ...item };
              subject.subjectNameCode =
                subject.subjectName + " (" + subject.subjectCode + ")";
              return subject;
            });
            this.setState({
              DataList: modifiedData,
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
          inlineSpin: false,
        });
      })
      .catch((error) => {
        this.setState({
          showErrorBox: true,
          inlineSpin: false,
        });
      });
  };

  getContentData = () => {
    ContentService.GetContent()
      .then((response) => {
        if (response.success) {
          if (response.data) {
            let modifiedData = response.data.map((item) => {
              const dataItem = { ...item };
              dataItem.createdDate = moment(dataItem.createdDate).format("LL");
              return dataItem;
            });
            this.setState({
              contentData: modifiedData,
            });
          } else {
            this.setState({
              contentData: [],
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
  ConfirmDelete = () => {
    ContentService.DeleteContent(this.state.deletedId)
      .then((response) => {
        console.log(response);
        if (response.success) {
          this.getContentData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  filterCourseData = (e) => {
    this.setState({ filteredCourseCategoryId: e.currentTarget.value });
    this.setState({ inlineSpin: true });
    this.getCourseList(e.currentTarget.value);
  };
  changeShowForms = () => {
    this.getContentData();
    this.setState({
      data: {
        subjectId: "",
        title: "",
        content: "",
        eFileVMs: [],
        courseId: "",
        unit: "",
      },
      showForms: false,
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
        <div>
          {this.state.showErrorBox ? (
            <ErrorBox text="Content loading failed" url="#/manage-content" />
          ) : this.state.showForms ? (
            <div className="row">
              <div className="col-9 border-box">
                <button
                  onClick={() => {
                    this.setState({ showForms: false });
                  }}
                  className="btn btn-primary mt-1"
                >
                  Back
                </button>
                <AddUpdateContent
                  data={this.state.data}
                  CourseCategoryList={this.state.CourseCategoryList}
                  CourseList={this.state.CourseList}
                  DropdownListData={this.state.DropdownListData}
                  DropdownListData1={this.state.DropdownListData1}
                  DataList={this.state.DataList}
                  semesterData={this.state.semesterData}
                  filterData={this.filterData}
                  filterData1={this.filterData1}
                  filterSemester={this.filterSemester}
                  changeShowForms={this.changeShowForms}
                  filterCourseData={this.filterCourseData}
                />
              </div>
              <div className="col-3 border-box">
                <AddUpdateSubject
                  DropdownListData={this.state.DropdownListData}
                  DropdownListData1={this.state.DropdownListData1}
                  getSubjectList={this.getSubjectList}
                />
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-11">
                <DataListComponent
                  list={this.state.contentData}
                  listKeys={[
                    "courseName",
                    "subjectNameCode",
                    "semesterNo",
                    "unitName",
                    "title",
                    "createdDate",
                  ]}
                  headings={[
                    "Course",
                    "Subject",
                    "Semester",
                    "Unit",
                    "Title",
                    "Created Data",
                  ]}
                  editActionHandler={this.contentEditActionHandler}
                  deleteActionHandler={this.deleteActionHandler}
                />
              </div>
              <div className="col-1">
                <div className="form-group">
                  <button
                    onClick={() => {
                      this.setState({
                        data: {
                          subjectId: "",
                          title: "",
                          content: "Sample Text",
                          eFileVMs: [],
                          courseId: "",
                          unit: "",
                        },
                        showForms: true,
                      });
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    Add New
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}

export default ContentForm;
