import InstituteService from "../../../services/InstituteService";
import PageLoader from "../../common/PageLoader";
import Form from "../../common/Form";
import ErrorBox from "../../common/ErrorBox";
import Joi from "joi-browser";
import Input from "../../common/Input";
import "../../../stylesheets/details.css";
import SubmitButton from "../../common/SubmitButton";

class Details extends Form {
  state = {
    data: {
      name: "",
      code: "",
      fax: "",
      phoneNo: "",
      email: "",
      logoPath: "",
      address: "",
    },
    loading: true,
    showErrorBox: false,
    errors: {},
    previewImage: null,
    currentImageName: "Choose File",
    spin: false,
  };
  schema = {
    name: Joi.string().required().label("Name"),
    code: Joi.string().required().label("Code"),
    fax: Joi.string().required().label("Fax"),
    phoneNo: Joi.string().required().label("Phone No."),
    email: Joi.string().required().email().label("Email"),
    address: Joi.string().required().label("Address"),
  };
  componentDidMount() {
    this.props.changeBreadCumbLinks("Institute Details", "/institute/details");
    this.GetInstituteDetails();
  }
  GetInstituteDetails = () => {
    InstituteService.getInstituteDetails()
      .then((response) => {
        if (response.success) {
          if (response.data) {
            this.setState({
              data: response.data,
            });
          }
        } else {
          this.setState({ showErrorBox: true });
        }
        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          showErrorBox: true,
        });
      });
  };
  doSubmit = () => {
    this.setState({ spin: true });
    InstituteService.SaveInstitute(this.state.data)
      .then((response) => {
        if (response.success) {
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
    return this.state.loading ? (
      <div className="loaderWrapper">
        <PageLoader />
      </div>
    ) : (
      <div className="card mt-2">
        <div className="card-header">
          <span>Manage Institute Details</span>
        </div>

        <div className="card-body">
          {this.state.showErrorBox ? (
            <ErrorBox
              text="Institute details loading failed."
              url="institute/details"
            />
          ) : (
            <div>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-4">
                    <Input
                      name="name"
                      type="text"
                      label="Name"
                      value={this.state.data.name ?? ""}
                      handleInputChange={this.handleInputChange}
                      placeholder="Enter Name of the Institute"
                      error={this.state.errors.name}
                    />
                  </div>
                  <div className="col-4">
                    <Input
                      name="code"
                      type="text"
                      label="Code"
                      value={this.state.data.code ?? ""}
                      handleInputChange={this.handleInputChange}
                      placeholder="Enter Code of the Institute"
                      error={this.state.errors.code}
                    />
                  </div>
                  <div className="col-4">
                    <Input
                      name="email"
                      type="email"
                      label="Email Id"
                      value={this.state.data.email ?? ""}
                      handleInputChange={this.handleInputChange}
                      placeholder="Enter Email Id of the Institute"
                      error={this.state.errors.email}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <Input
                      name="fax"
                      type="text"
                      label="Fax"
                      value={this.state.data.fax ?? ""}
                      handleInputChange={this.handleInputChange}
                      placeholder="Enter Fax of the Institute"
                      error={this.state.errors.fax}
                    />
                  </div>
                  <div className="col-4">
                    <Input
                      name="phoneNo"
                      type="text"
                      label="Phone Number"
                      value={this.state.data.phoneNo ?? ""}
                      handleInputChange={this.handleInputChange}
                      placeholder="Enter Phone Number of the Institute"
                      error={this.state.errors.phoneNo}
                    />
                  </div>
                  <div className="col-4">
                    <Input
                      name="address"
                      type="text"
                      label="Address"
                      value={this.state.data.address ?? ""}
                      handleInputChange={this.handleInputChange}
                      placeholder="Enter Address of the Institute"
                      error={this.state.errors.address}
                    />
                  </div>
                  <div className="offset-md-4 col-4">
                    <SubmitButton spin={this.state.spin} text="Submit" />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Details;
