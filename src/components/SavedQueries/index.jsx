import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card } from "antd";
import { getFormaData } from "../../helpers/localStorageHelper";
import NavigationBar from "../NavigationBar";
import DeleteQuery from "../DeleteQuery";
import ExecuteQuery from "../ExecuteQuery";
import EditQuery from "../EditQuery";
import SavedQueriesModal from "../SavedQueriesModal";

const SavedQueries = () => {
  const [savedRequests, setSavedRequests] = useState([]);
  const [changeModal, setChangeModal] = useState(false);
  const { active } = useSelector((store) => store.saveInfo);

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
                  <ExecuteQuery savedQuery={item} savedRequests={savedRequests} />
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
        <SavedQueriesModal
          changeModal={changeModal}
          cancelModal={cancelModal}
          handleSaveChanges={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default SavedQueries;
