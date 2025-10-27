import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getFormaData } from "../../helpers/localStorageHelper";
import NavigationBar from "../../components/NavigationBar";
import SavedQueriesModal from "../../components/SavedQueriesModal";
import SavedQuerisList from "../../components/SavedQueriesList";

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
      <div className="savedQueriesContainer">
        {savedRequests.length > 0 ? (
          <SavedQuerisList
            savedRequests={savedRequests}
            setChangeModal={setChangeModal}
            setSavedRequests={setSavedRequests}
          />
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
