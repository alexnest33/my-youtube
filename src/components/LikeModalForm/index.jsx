import { Modal, Form, Input } from "antd";
import { useReducer } from "react";

const LikeModalForm = ({ text, isModalOpen, setIsModalOpen }) => {
  function saveReducer(state, action) {
    switch (action.type) {
      case "changeTitle":
        return { ...state, title: action.payload };
      case "changeMaxResults":
        return { ...state, maxResults: action.payload };
      case "changeSort":
        return { ...state, sorted: action.payload };
      case "changeName":
        return { ...state, name: action.payload };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(saveReducer, {
    name: text,
    title: "",
    maxResults: 15,
    sorted: "relevance",
  });

  const handleChangeTitle = (e) => {
    dispatch({ type: "changeTitle", payload: e.target.value });
  };

  const handleChangeMaxResult = (e) => {
    console.log(e.target);
    dispatch({ type: "changeMaxResults", payload: e.target.value });
  };

  const handleChangeSort = (e) => {
    console.log(e.target);
    dispatch({ type: "changeSort", payload: e.target.value });
  };

  const handleChangeName = (e) => {
    dispatch({ type: "changeName", payload: e.target.value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    // setIsModalOpen(false);
    console.log(state);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleOk}
        title="Сохранить запрос"
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form layout="vertical">
          <Form.Item label="Запрос">
            <Input
              disabled
              value={state.name}
              onChange={handleChangeName}
              placeholder="Чем кормить кота"
            />
          </Form.Item>

          <Form.Item label="Название">
            <Input
              placeholder="Укажите название"
              onChange={handleChangeTitle}
              value={state.title}
            />
          </Form.Item>
          <Form.Item label="Сортировать по">
            <select value={state.sorted} onChange={handleChangeSort}>
              <option value="relevance">По релевантности</option>
              <option value="date">По дате</option>
              <option value="rating">По рейтингу</option>
              <option value="viewCount">По просмотрам</option>
            </select>
          </Form.Item>

          <Form.Item label="Максимальное количество">
            <Input
              type="number"
              value={state.maxResults}
              onChange={handleChangeMaxResult}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LikeModalForm;
