import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ErrorBox = ({ text, url }) => {
  return (
    <div className="alert alert-danger text-center error-box">
      <h1>
        <FontAwesomeIcon size="2x" icon={faExclamationCircle} />
      </h1>
      <h3>
        <span className="font-weight-bold">Oops ! </span>Something went wrong.
      </h3>
      <h4>{text}</h4>
      <a className="btn btn-primary" href={process.env.REACT_APP_URL + url}>
        Try Again
      </a>
    </div>
  );
};
export default ErrorBox;
