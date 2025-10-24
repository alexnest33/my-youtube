import { Button } from "antd";

const DeleteQuery = ({ savedQuery, setSavedRequests }) => {
  
  const handleDelete = (id) => {
    setSavedRequests((prevState) => {
      const newState = prevState.filter((item) => item.id !== id);
      localStorage.setItem("forma", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <Button type="primary" danger onClick={() => handleDelete(savedQuery.id)}>
      Удалить
    </Button>
  );
};

export default DeleteQuery;
