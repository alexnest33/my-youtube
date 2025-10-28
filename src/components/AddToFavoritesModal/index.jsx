import { useReducer, useEffect } from "react";
import { Modal, Form, Input, Slider, message } from "antd";
import { getFormaData } from "../../helpers/localStorageHelper";

const AddToFavoritesModal = ({
  text,
  isModalOpen,
  setIsModalOpen,
  setIsLiked,
  isEditMode = false,
  editData,
  onSaveEdit
}) => {
  const [messageApi, contextHolder] = message.useMessage();


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
      case "setData":
        return { ...action.payload };

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

  useEffect(() => {
    if (isModalOpen) {
      if (isEditMode && editData) {
        dispatch({ type: "setData", payload: editData });
      } else {
        dispatch({
          type: "setData", payload: {
            name: text,
            title: "",
            maxResults: 15,
            sorted: "relevance"
          }
        });
      }
    }
  }, [isModalOpen, isEditMode, editData, text]);

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
    if (isEditMode) {
      onSaveEdit(state);
    } else {
      const data = getFormaData();
      data.push({ ...state, id: crypto.randomUUID(), name: text });
      localStorage.setItem("forma", JSON.stringify(data));
      dispatch({ type: "reset" });
      setIsLiked(true);
      messageApi.info('Запрос добавлен во вкладку "Избранное"');
    }
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={closeModal}
      onOk={handleOk}
      title={isEditMode ? "Редактировать запрос" : "Сохранить запрос"}
      okText={isEditMode ? "Сохранить изменения" : "Сохранить"}
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

export default AddToFavoritesModal;
