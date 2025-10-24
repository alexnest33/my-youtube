import { Modal, Input, Form, Slider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeRequest } from "../../redux/slices/saveInfoSlice";

const SavedQueriesModal = ({ changeModal, cancelModal, handleSaveChanges }) => {
  const { active } = useSelector((store) => store.saveInfo);
  const dispatch = useDispatch();

  return (
    <Modal
      open={changeModal}
      title="Редактировать запрос"
      okText="Сохранить"
      cancelText="Отмена"
      onCancel={cancelModal}
      onOk={handleSaveChanges}
    >
      <Form layout="vertical">
        <Form.Item label="Запрос:">
          <Input disabled value={active.name} />
        </Form.Item>
        <Form.Item label="Название:">
          <Input
            placeholder="Укажите название"
            onChange={(e) =>
              dispatch(changeRequest({ ...active, title: e.target.value }))
            }
            value={active.title}
          />
        </Form.Item>
        <Form.Item label="Сортировать по:">
          <select
            value={active.sorted}
            onChange={(e) =>
              dispatch(changeRequest({ ...active, sorted: e.target.value }))
            }
          >
            <option value="relevance">По релевантности</option>
            <option value="date">По дате</option>
            <option value="rating">По рейтингу</option>
            <option value="viewCount">По просмотрам</option>
          </select>
        </Form.Item>
        <Form.Item label="Максимальное количество">
          <Slider
            value={active.maxResults}
            max={15}
            onChange={(value) =>
              dispatch(changeRequest({ ...active, maxResults: value }))
            }
            tooltip={{ open: true }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SavedQueriesModal;
