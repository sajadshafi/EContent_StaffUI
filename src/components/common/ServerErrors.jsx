const ServerErrors = ({ errors }) => {
  if (errors.length) {
    return (
      <ul className="text-danger">
        {errors.map((error, index) => {
          return <li key={index}>{error}</li>;
        })}
      </ul>
    );
  } else {
    return "";
  }
};
export default ServerErrors;
