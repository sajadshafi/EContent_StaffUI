import Form from "../../common/Form";
import DropdownList from "../../common/DropdownList";
import InlineSpinner from "../../common/InlineSpinner";
import Input from "../../common/Input";
import Joi from "joi-browser";
import SubmitButton from "../../common/SubmitButton";
import Editor from "../../common/Editor";
import FileUploader from "../../common/FileUploader";
import ContentService from "../../../services/ContentService";
class AddUpdateContent extends Form {
  state = {
    data: {
      subjectId: "",
      title: "",
      content: "",
      courseId: "",
      unit: "",
      eFileVMs: [],
    },
    unitData: [],
    errors: {},
    inlineSpin: false,
    spin: false,
    fileUploadSpin: false,
    renderHack: true,
  };
  componentDidMount() {
    this.setUnitData();
    this.setState({
      data: this.props.data,
    });
  }
  setUnitData = () => {
    let data = [];
    for (let i = 0; i < 5; i++) {
      let obj = { text: "Unit " + i, id: i };
      if (i === 0) obj.text = "General";
      data.push(obj);
    }
    this.setState({
      unitData: data,
    });
  };
  schema = {
    subjectId: Joi.string().required().label("Subject"),
    title: Joi.string().required().label("Title"),
    content: Joi.string().required().label("Content"),
    courseId: Joi.string().required().label("Course"),
    unit: Joi.number()
      .required()
      .label("Unit")
      .options({
        language: {
          number: { base: "is not allowed to be empty" },
        },
      }),
  };
  StoreFiles = (file) => {
    const data = { ...this.state.data };
    data.eFileVMs.push(file);
    this.setState({ data });
  };
  DeleteFile = (file) => {
    const data = { ...this.state.data };
    let index = data.eFileVMs.findIndex((x) => x.filePath === file.filePath);
    data.eFileVMs[index].active = false;

    this.setState({ data });
  };

  onChangeContent = (e) => {
    console.log(e);
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField({ name: "content", value: e });

    if (errorMessage) errors["content"] = errorMessage;
    else delete errors["content"];

    const data = { ...this.state.data };
    data["content"] = e;
    this.setState({ data, errors });
  };
  doSubmit = () => {
    this.setState({ spin: true });
    ContentService.SaveContent(this.state.data)
      .then((response) => {
        if (response.success) {
          this.showSuccessSwal(response.message);
          this.setState({
            data: {
              subjectId: "",
              title: "",
              content: "",
              unit: "",
              courseId: "",
              eFileVMs: [],
            },
            renderHack: false,
          });
          this.setState({ renderHack: true });
          this.props.changeShowForms();
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
  onFileUpload = (e) => {
    this.setState({
      fileUploadSpin: true,
    });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h5>Add Content</h5>

        <div className="row">
          <div className="col-4">
            <DropdownList
              name="subjectCategoryId"
              textField="name"
              list={this.props.DropdownListData}
              label="Filter Subjects by category"
              onchangeHandler={this.props.filterData}
              valueParam={this.state.filteredCategoryId ?? ""}
            />
          </div>
          <div className="col-4">
            <DropdownList
              name="departmentId"
              textField="departmentName"
              list={this.props.DropdownListData1}
              label="Filter Subjects by Department"
              onchangeHandler={this.props.filterData1}
              valueParam={this.state.filteredDepartmentId ?? ""}
            />
          </div>
          <div className="col-4">
            <DropdownList
              name="semesterNo"
              textField="text"
              list={this.props.semesterData}
              label="Filter Subjects by Semester"
              onchangeHandler={this.props.filterSemester}
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
        <div className="row">
          <div className="col-4">
            <DropdownList
              name="courseCategoryId"
              textField="name"
              list={this.props.CourseCategoryList}
              label="Filter Courses by Category"
              onchangeHandler={this.props.filterCourseData}
              valueParam={this.state.courseCategoryId ?? ""}
            />
          </div>
          <div className="col-4">
            <DropdownList
              name="courseId"
              textField="courseName"
              list={this.props.CourseList}
              error={this.state.errors.courseId}
              label="Select Course"
              onchangeHandler={this.handleInputChange}
              valueParam={this.state.data.courseId ?? ""}
            />
          </div>
          <div className="col-4">
            <DropdownList
              name="subjectId"
              textField="subjectNameCode"
              error={this.state.errors.subjectId}
              list={this.props.DataList}
              label="Select Subject"
              onchangeHandler={this.handleInputChange}
              valueParam={this.state.data.subjectId ?? ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <DropdownList
              name="unit"
              textField="text"
              list={this.state.unitData}
              error={this.state.errors.unit}
              label="Select Unit"
              onchangeHandler={this.handleInputChange}
              valueParam={this.state.data.unit ?? ""}
            />
          </div>
          <div className="col-8">
            <Input
              name="title"
              type="text"
              label="Content Title"
              value={this.state.data.title ?? ""}
              handleInputChange={this.handleInputChange}
              placeholder="Enter Content Title"
              error={this.state.errors.title}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <FileUploader
              files={this.state.data.eFileVMs}
              StoreFiles={this.StoreFiles}
              DeleteFile={this.DeleteFile}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label htmlFor="content">Enter Content</label>
            <Editor
              name="content"
              onChangeContent={this.onChangeContent}
              value={this.state.data.content ?? "Sample Text"}
            />
            {this.state.errors.content && (
              <span className="text-danger">{this.state.errors.content}</span>
            )}
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12">
            <SubmitButton spin={this.state.spin} text="Save Content" />
          </div>
        </div>
      </form>
    );
  }
}
export default AddUpdateContent;
