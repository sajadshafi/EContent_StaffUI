import "../../stylesheets/SubjectCheckBox.css";
const SubjectCheckBox = ({ data, label }) => {
  const RenderSubjects = () => {
    let html = (
      <p className="text-danger">
        No Subject found. You need to add subjects in Institute section.
      </p>
    );
    if (data && data.length > 0) {
      html = data.map((item) => {
        return (
          <p className="p-checkbox">
            <input type="checkbox" value="1" /> {item.name} - {item.code}
          </p>
        );
      });
    }
    return html;
  };
  return (
    <div className="border-box">
      <p>{label}</p>
      {RenderSubjects()}
    </div>
  );
};

export default SubjectCheckBox;
