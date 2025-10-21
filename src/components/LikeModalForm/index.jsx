import { Modal, Form, Input, Slider, message } from "antd";
import { useReducer } from "react";

const LikeModalForm = ({
  text,
  setText,
  isModalOpen,
  setIsModalOpen,
  setIsLiked,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { active } = useSelector(store => store.saveInfo)

  function saveReducer(state, action) {
    switch (action.type) {
      case "changeTitle":
        return { ...state, title: action.payload };
      case "changeMaxResults":
        return { ...state, maxResults: action.payload };
      case "changeSort":
        return { ...state, sorted: action.payload };
      case "reset":
        return {
          name: "",
          title: "",
          maxResults: 15,
          sorted: "relevance",
        };

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

  const handleChangeMaxResult = (value) => {
    dispatch({ type: "changeMaxResults", payload: value });
  };

  const handleChangeSort = (e) => {
    console.log(e.target);
    dispatch({ type: "changeSort", payload: e.target.value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    const data = JSON.parse(localStorage.getItem("forma")) || [];
    data.push({ ...state, id: crypto.randomUUID(), name: text });
    localStorage.setItem("forma", JSON.stringify(data));
    setIsModalOpen(false);
    dispatch({ type: "reset" });
    setText("");
    setIsLiked(true);
    messageApi.info('Запрос добавлен во вкладку "Избранное"');
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={closeModal}
      onOk={handleOk}
      title="Сохранить запрос"
      okText="Сохранить"
      cancelText="Отмена"
    >
      {contextHolder}
      <Form layout="vertical">
        <Form.Item label="Запрос:">
          <Input disabled value={text} />
        </Form.Item>
        <Form.Item label="Название:">
          <Input
            placeholder="Укажите название"
            onChange={handleChangeTitle}
            value={state.title}
          />
        </Form.Item>
        <Form.Item label="Сортировать по:">
          <select value={state.sorted} onChange={handleChangeSort}>
            <option value="relevance">По релевантности</option>
            <option value="date">По дате</option>
            <option value="rating">По рейтингу</option>
            <option value="viewCount">По просмотрам</option>
          </select>
        </Form.Item>
        <Form.Item label="Максимальное количество">
          <Slider
            value={state.maxResults}
            max={15}
            onChange={handleChangeMaxResult}
            tooltip={{ open: true }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LikeModalForm;
