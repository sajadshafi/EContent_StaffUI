import LoadingOverlay from "react-loading-overlay";
const PageLoader = () => {
  return (
    <LoadingOverlay
      className="loader-wrapper"
      active={true}
      spinner
      text="Loading..."
      styles={{
        spinner: (base) => ({
          ...base,
          width: "60px",
          "& svg circle": {
            stroke: "#000",
            strokeWidth: "4",
          },
        }),
      }}
    ></LoadingOverlay>
  );
};
export default PageLoader;
