import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import ContentService from "../../services/ContentService";
import ServerErrors from "./ServerErrors";
class FileUploader extends React.Component {
  state = {
    spin: false,
    data: { formFile: "", description: "" },
    fileName: "",
    errors: {},
    fileInput: "",
    ServerErrors: [],
  };

  RenderSpinner = () => {
    if (this.state.spin) {
      return (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      );
    }
  };

  RenderFiles = () => {
    let activeFiles = [];
    if (this.props.files && this.props.files.length > 0)
      activeFiles = this.props.files.filter((file) => file.active === true);

    if (activeFiles.length > 0) {
      return (
        <table className="table table-bordered table-striped table-sm">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activeFiles.map((file, index) => {
              return (
                <tr key={index}>
                  <td className="text-primary">
                    <a
                      target="_blank"
                      href={
                        process.env.REACT_APP_API_ENDPOINT +
                        "download-file?FileName=" +
                        file.filePath
                      }
                    >
                      {file.filePath}
                    </a>
                  </td>
                  <td>{file.description}</td>
                  <td>
                    <Button
                      title="Delete"
                      onClick={() => this.props.DeleteFile(file)}
                      variant="link"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      return <div className="alert alert-info">No file found.</div>;
    }
  };
  onFileUpload = () => {
    const errors = { ...this.state.errors };
    if (this.state.data.description === "") {
      errors.description = "Description is not allowed to be empty";
    }

    if (this.state.data.formFile === "") {
      errors.formFile = "Please select a file to upload";
    }
    if (errors && Object.keys(errors).length === 0) {
      this.setState({ spin: true });
      ContentService.UploadFile(this.state.data)
        .then((response) => {
          if (response.success) {
            this.props.StoreFiles(response.data);
            this.setState({
              data: { formFile: "", description: "" },
              fileName: "",
            });
          } else {
            this.setState({
              ServerErrors: response.errors,
            });
          }
          this.setState({ spin: false });
        })
        .catch((error) => {
          this.setState({
            ServerErrors: ["Some unknown error has occurred. Please try again"],
          });
          this.setState({ spin: false });
        });
    } else {
      this.setState({
        errors,
      });
    }
  };
  onFileChoose = (e) => {
    console.log(e);
    const imageFile = e.target.files[0];
    this.setState({ fileName: e.target.value });
    const errors = { ...this.state.errors };
    // VALIDATION
    if (!imageFile) {
      errors.formFile = "Please select a valid file";
    } else {
      delete errors["formFile"];
    }

    if (!imageFile.name.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/)) {
      errors.formFile =
        "Only pdf,word,excel and powerpoint files are allowed to upload";
    } else {
      if (imageFile.size > process.env.REACT_APP_MAX_FILE_SIZE) {
        errors.formFile = "Maximum filesize allowed is 2MB";
      } else {
        delete errors["formFile"];
      }
    }

    //
    const data = { ...this.state.data };
    data.formFile = e.target.files[0];
    this.setState({ data, errors });
  };
  onDescriptionChange = (e) => {
    const errors = { ...this.state.errors };
    delete errors["description"];
    const data = { ...this.state.data };
    data.description = e.currentTarget.value;
    this.setState({ data, errors });
  };
  render() {
    return (
      <div
        style={{
          padding: "10px",
          border: "1px solid #dfdfdf",
          paddingTop: "5px",
        }}
      >
        <p
          style={{
            marginBottom: "4px",
            fontWeight: "bold",
            color: "#007cbe",
            fontStyle: "italic",
            fontSize: "12px",
          }}
        >
          File Uploader
        </p>
        <ServerErrors errors={this.state.ServerErrors} />
        <div className="row">
          <div className="col-2 text-center">
            <p className="mt-1 mb-0">Add new file</p>
          </div>

          <div className="col-4">
            <input
              type="text"
              value={this.state.data.description ?? ""}
              onChange={this.onDescriptionChange}
              className="form-control"
              placeholder="Enter File Description"
            />
            {this.state.errors.description && (
              <span className="text-danger">
                {this.state.errors.description}
              </span>
            )}
          </div>
          <div className="col-4">
            <input
              type="file"
              value={this.state.fileName ?? ""}
              onChange={this.onFileChoose}
              className="form-control"
            />
            {this.state.errors.formFile && (
              <span className="text-danger">{this.state.errors.formFile}</span>
            )}
          </div>
          <div className="col-2">
            <button
              onClick={this.onFileUpload}
              type="button"
              className="btn btn-success btn-sm form-control"
            >
              {this.RenderSpinner()} {this.state.spin ? "Uploading" : "Upload"}
            </button>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-12">{this.RenderFiles()}</div>
        </div>
      </div>
    );
  }
}

export default FileUploader;
