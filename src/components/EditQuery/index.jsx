import { useDispatch } from "react-redux";
import { changeRequest } from "../../redux/slices/saveInfoSlice";
import { Button } from "antd";

const EditQuery = ({ savedQuery, setChangeModal, savedRequests }) => {
  const dispatch = useDispatch();

  const handleChangeRequest = (id) => {
    const result = savedRequests.find((item) => item.id === id);
    dispatch(changeRequest(result));
    setChangeModal(true);
  };

  return (
    <>
      <Button
        onClick={() => handleChangeRequest(savedQuery.id)}
        style={{ marginRight: 8 }}
        type="primary"
      >
        Изменить
      </Button>
    </>
  );
};

export default EditQuery;
