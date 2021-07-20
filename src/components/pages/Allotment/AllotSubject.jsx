import Form from "../../common/Form";
import InstituteService from "../../../services/InstituteService";
import SubmitButton from "../../common/SubmitButton";
import SubjectCheckBox from "../../common/SubjectCheckBox";
import Joi from "joi-browser";
import DropdownList from "../../common/DropdownList";
class AllotSubject extends Form {
  state = {
    data: { courseCategoryId: "", courseId: "" },
    errors: {},
    courseCategoryData: [],
    courseData: [],
    semesterData: [],
  };
  schema = {
    courseId: Joi.string().required().label("Course"),
    courseCategoryId: Joi.string().required().label("Course Category"),
    semesterNo: Joi.string().required().label("Semester"),
  };
  componentDidMount() {
    this.getCourseCategoryData();
  }
  getCourseCategoryData = () => {
    InstituteService.getCourseCategoryList().then((response) => {
      if (response.success) {
        if (response.data) {
          this.setState({
            courseCategoryData: response.data,
          });
        }
      }
    });
  };
  getCourseData = (categoryId) => {
    InstituteService.getCourseList(categoryId).then((response) => {
      if (response.success) {
        if (response.data) {
          this.setState({
            courseData: response.data,
          });
        }
      }
    });
  };
  getSemesterData = (noOfSemesters) => {
    let semesterData = [];
    for (let i = 1; i <= noOfSemesters; i++) {
      let obj = { text: "Semester " + i, id: i };
      semesterData.push(obj);
    }
    this.setState({
      semesterData: semesterData,
    });
  };
  handleCategoryChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(e.currentTarget);

    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
      this.setState({
        courseData: [],
        semesterData: [],
      });
    } else {
      delete errors[e.currentTarget.name];
      this.getCourseData(e.currentTarget.value);
      let semesterNo = this.state.courseCategoryData.find(
        (x) => x.id === e.currentTarget.value
      ).numberOfSemesters;
      this.getSemesterData(semesterNo);
    }

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };
  handleCourseChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(e.currentTarget);

    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else {
      delete errors[e.currentTarget.name];
    }

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };
  handleSemesterChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(e.currentTarget);

    if (errorMessage) {
      errors[e.currentTarget.name] = errorMessage;
    } else {
      delete errors[e.currentTarget.name];
    }

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };
  render() {
    return (
      <form action="">
        <div className="row">
          <div className="col-4">
            <DropdownList
              name="courseCategoryId"
              textField="name"
              list={this.state.courseCategoryData}
              label="Select Course Category"
              error={this.state.errors.courseCategoryId}
              onchangeHandler={this.handleCategoryChange}
              valueParam={this.state.data.courseCategoryId ?? ""}
            />
          </div>
          <div className="col-4">
            <DropdownList
              name="courseId"
              textField="courseName"
              list={this.state.courseData}
              label="Select Course"
              error={this.state.errors.courseId}
              onchangeHandler={this.handleCourseChange}
              valueParam={this.state.data.courseId ?? ""}
            />
          </div>
          <div className="col-4">
            <DropdownList
              name="semesterNo"
              textField="text"
              list={this.state.semesterData}
              label="Select Semester"
              error={this.state.errors.semesterNo}
              onchangeHandler={this.handleSemesterChange}
              valueParam={this.state.data.semesterNo ?? ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <SubjectCheckBox label="Select Core Subjects" />
          </div>
        </div>
      </form>
    );
  }
}

export default AllotSubject;
