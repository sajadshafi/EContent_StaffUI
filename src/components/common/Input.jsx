const Input = ({
  type,
  name,
  value,
  label,
  placeholder,
  handleInputChange,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        type={type}
        name={name}
        id={name}
        className="form-control"
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default Input;
