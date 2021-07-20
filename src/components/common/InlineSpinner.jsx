import Spinner from "react-bootstrap/Spinner";
const InlineSpinner = ({ spin, styles }) => {
  if (spin) {
    return (
      <Spinner
        variant="primary"
        style={styles}
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    );
  }
  return "";
};

export default InlineSpinner;
