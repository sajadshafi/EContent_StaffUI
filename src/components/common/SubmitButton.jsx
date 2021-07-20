import Spinner from "react-bootstrap/Spinner";

const SubmitButton = ({ text, spin }) => {
  const RenderSpinner = () => {
    if (spin) {
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
  return (
    <div className="form-group">
      <button
        type="submit"
        disabled={spin}
        className="btn btn-primary form-control"
      >
        {RenderSpinner()} {spin ? "Please wait" : text}
      </button>
    </div>
  );
};

export default SubmitButton;
