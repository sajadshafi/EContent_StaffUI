import React from "react";
import Joi from "joi-browser";
import Swal from "sweetalert2";
class Form extends React.Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      if (!(item.path[0] in errors)) errors[item.path[0]] = item.message;
    }
    return errors;
  };
  validateField = ({ name, value }) => {
    const schemaObj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(schemaObj, schema);
    return error ? error.details[0].message : null;
  };
  handleInputChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateField(e.currentTarget);

    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };

  editActionHandler = (item) => {
    this.setState({ data: item, SaveLabel: "Update" });
  };

  deleteActionHandler = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, Delete it.`,
      confirmButtonColor: "#a30016",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.setState({ deletedId: item.id });
        this.ConfirmDelete();
      }
    });
  };

  showSuccessSwal = (message) => {
    Swal.fire({
      title: "Success !",
      text: message,
      icon: "success",
      confirmButtonColor: "#0e0eaf",
      confirmButtonText: "Ok",
    });
  };
  showErrorSwal = (message) => {
    Swal.fire({
      title: "Oops !",
      text: message,
      icon: "error",
      confirmButtonColor: "#0e0eaf",
      confirmButtonText: "Ok",
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.captchaValue === "")
      this.setState({ captchaError: "Captcha is required" });
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;
    //
    this.doSubmit();
    //
  };
}

export default Form;
