import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

const DataList = ({
  list,
  listKeys,
  headings,
  editActionHandler,
  deleteActionHandler,
  additionalAction = null,
}) => {
  const renderHeader = () => {
    return headings.map((item, index) => {
      return <th key={index}>{item}</th>;
    });
  };
  const renderList = () => {
    return list.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          {listKeys.map((listKey, listKeyIndex) => {
            return <td key={listKeyIndex}>{item[listKey]}</td>;
          })}
          <td>
            <Button onClick={() => editActionHandler(item)} variant="link">
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button onClick={() => deleteActionHandler(item)} variant="link">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            {additionalAction != null ? (
              <Button
                onClick={() => additionalAction.handler(item)}
                variant="link"
              >
                <FontAwesomeIcon icon={additionalAction.icon} />
              </Button>
            ) : (
              ""
            )}
          </td>
        </tr>
      );
    });
  };
  if (list && list.length) {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            {renderHeader()}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderList()}</tbody>
      </Table>
    );
  } else {
    return <div className="alert alert-info">No Record found</div>;
  }
};
export default DataList;
