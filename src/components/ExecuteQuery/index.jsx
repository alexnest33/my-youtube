import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Button } from "antd";
import { saving } from "../../redux/slices/saveInfoSlice";

const ExecuteQuery = ({ savedQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (id) => {
    const result = savedRequests.find((item) => item.id === id);
    dispatch(saving(result));
    navigate("/menu");
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginRight: 8 }}
        onClick={() => handleClick(savedQuery.id)}
      >
        Выполнить
      </Button>
    </>
  );
};

export default ExecuteQuery;
