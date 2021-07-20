import React from "react";
import "./../../stylesheets/login.css";
import ReCAPTCHA from "react-google-recaptcha";
import Input from "../common/Input";
import SubmitButton from "../common/SubmitButton";
import Joi from "joi-browser";
import Form from "../common/Form";
import AuthService from "../../services/AuthService";
import { Redirect } from "react-router-dom";

class Login extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    loading: false,
    recaptchaRef: null,
    captchaValue: "",
    captchaError: "",
    errors: {},
    message: "",
    redirectToReferrer: false,
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  componentDidMount() {
    if (this.props.isLoggedIn) this.setState({ redirectToReferrer: true });
  }
  handleCaptchachange = (value) => {
    this.setState({ captchaValue: value, captchaError: "" });
  };
  RenderErrorMessage() {
    if (this.state.message !== "") {
      return (
        <p className="text-danger font-weight-bold">* {this.state.message}</p>
      );
    }
  }
  doSubmit = () => {
    if (
      this.state.captchaError !== "" ||
      this.state.captchaValue === "" ||
      this.state.captchaValue === undefined
    )
      return;
    this.setState({ loading: true });
    AuthService.LoginUser(this.state.data)
      .then((response) => {
        if (response.success && response.data !== null) {
          localStorage.setItem("token", response.data.token);
          this.props.AuthenticateUser(response.data);
          this.setState({ redirectToReferrer: true });
        } else {
          this.setState({
            data: {
              username: "",
              password: "",
            },
            captchaValue: "",
          });

          this.state.recaptchaRef.reset();
          this.setState({ message: response.message });
        }
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };
  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboard" },
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div className="container">
        <div className="card mt-5 login-card gray-500">
          <div className="card-body">
            <div className="login-header text-center">
              <h3>Login to your Account</h3>
              <p>Common Access Panel for all Users</p>
            </div>
            {this.RenderErrorMessage()}
            <div className="form">
              <form onSubmit={this.onSubmit}>
                <Input
                  name="username"
                  type="text"
                  label="Username"
                  value={this.state.data.username}
                  handleInputChange={this.handleInputChange}
                  placeholder="Enter Username"
                  error={this.state.errors.username}
                />
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  value={this.state.data.password}
                  handleInputChange={this.handleInputChange}
                  placeholder="Enter Password"
                  error={this.state.errors.password}
                />
                <div className="form-group">
                  <ReCAPTCHA
                    ref={(r) => (this.state.recaptchaRef = r)}
                    onChange={this.handleCaptchachange}
                    sitekey={process.env.REACT_APP_CAPTCHA_KEY}
                  />
                  {this.state.captchaError !== "" ? (
                    <span className="text-danger">
                      {this.state.captchaError}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <SubmitButton spin={this.state.loading} text="Login" />
                <div className="form-group">
                  <div className="row">
                    <div className="col-6">
                      <a href="#">Have referrel ?</a>
                    </div>
                    <div className="col-6">
                      <a className="float-right" href="#">
                        Forgot Password ?
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
