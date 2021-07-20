const DropdownList = ({
  list,
  label,
  name,
  value,
  onchangeHandler,
  error,
  valueParam,
  textField,
}) => {
  const renderOptions = () => {
    if (list) {
      return list.map((item, index) => {
        if (valueParam === item.id) {
          return (
            <option key={index} value={item.id} selected>
              {item[textField]}
            </option>
          );
        } else {
          return (
            <option key={index} value={item.id}>
              {item[textField]}
            </option>
          );
        }
      });
    }
  };
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-control"
        onChange={onchangeHandler}
        name={name}
        id={name}
        value={value}
      >
        <option value="">--Select--</option>
        {renderOptions()}
      </select>
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default DropdownList;
