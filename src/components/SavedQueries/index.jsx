import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Modal, Input, Form, Slider } from "antd";
import { changeRequest } from "../../redux/slices/saveInfoSlice";
import { getFormaData } from "../../helpers/localStorageHelper";
import NavigationBar from "../NavigationBar";
import DeleteQuery from "../DeleteQuery";
import ExecuteQuery from "../ExecuteQuery";
import EditQuery from "../EditQuery";

const SavedQueries = () => {
  const [savedRequests, setSavedRequests] = useState([]);
  const [changeModal, setChangeModal] = useState(false);
  const { active } = useSelector((store) => store.saveInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = getFormaData();
    setSavedRequests(data);
  }, []);

  const cancelModal = () => {
    setChangeModal(false);
  };

  const handleSaveChanges = () => {
    const updated = savedRequests.map((item) =>
      item.id === active.id ? active : item
    );
    localStorage.setItem("forma", JSON.stringify(updated));
    setSavedRequests(updated);
    setChangeModal(false);
  };

  return (
    <div>
      <NavigationBar />
      <div
        style={{
          borderRadius: 0,
          padding: 2,
          maxWidth: "65%",
          margin: "20px auto 0 auto",
        }}
      >
        {savedRequests.length > 0 ? (
          savedRequests.map((item) => (
            <Card
              key={item.id}
              style={{ marginBottom: 4, padding: 0, borderRadius: 4 }}
              bodyStyle={{ padding: "2px 8px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "4px 8px",
                }}
              >
                <span style={{ fontWeight: 500, fontSize: "14px " }}>
                  {item.title}
                </span>

                <div>
                  <ExecuteQuery savedQuery={item} />
                  <EditQuery
                    savedQuery={item}
                    setChangeModal={setChangeModal}
                    savedRequests={savedRequests}
                  />
                  <DeleteQuery
                    savedQuery={item}
                    setSavedRequests={setSavedRequests}
                  />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>Пока нет сохранённых запросов 😔</p>
        )}
      </div>
      {changeModal && (
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
      )}
    </div>
  );
};

export default SavedQueries;
