import Form from "../../common/Form";
import InstituteService from "../../../services/InstituteService";
import DropdownList from "../../common/DropdownList";
import Input from "../../common/Input";
import Joi from "joi-browser";
import SubmitButton from "../../common/SubmitButton";

class AddUpdateSubject extends Form {
  state = {
    data: {
      subjectName: "",
      subjectCode: "",
      numberOfSeats: "",
      semesterNo: "",
      subjectCategoryId: "",
      departmentId: "",
    },
    SaveLabel: "Add",
    spin: false,
    errors: {},
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
  doSubmit = () => {
    this.setState({ spin: true });
    InstituteService.SaveSubject(this.state.data)
      .then((response) => {
        if (response.success) {
          this.props.getSubjectList();
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
        console.log(error);
        this.showErrorSwal(process.env.REACT_APP_ERRORMESSAGE);
        this.setState({ spin: false });
      });
  };
  render() {
    return (
      <>
        <h5>{this.state.SaveLabel + " Subject"}</h5>
        <p
          style={{ fontStyle: "italic", fontSize: "12px" }}
          className="text-info font-weight-bold"
        >
          * Add only if not available in Select Subject dropdown
        </p>
        <form onSubmit={this.onSubmit}>
          <DropdownList
            name="subjectCategoryId"
            textField="name"
            list={this.props.DropdownListData}
            label="Select Subject Category"
            error={this.state.errors.subjectCategoryId}
            onchangeHandler={this.handleInputChange}
            valueParam={this.state.data.subjectCategoryId ?? ""}
          />
          <DropdownList
            name="departmentId"
            textField="departmentName"
            list={this.props.DropdownListData1}
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
      </>
    );
  }
}

export default AddUpdateSubject;
