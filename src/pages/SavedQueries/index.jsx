import { useState, useEffect } from "react";
import { getFormaData } from "../../helpers/localStorageHelper";
import NavigationBar from "../../components/NavigationBar";
import SavedQueriesModal from "../../components/SavedQueriesModal";
import SavedQuerisList from "../../components/SavedQueriesList";
import NoResults from "../../components/NoResults";

const SavedQueries = () => {
  const [savedRequests, setSavedRequests] = useState([]);
  const [changeModal, setChangeModal] = useState(false);


  useEffect(() => {
    const data = getFormaData();
    setSavedRequests(data);
  }, []);

  const cancelModal = () => {
    setChangeModal(false);
  };

  const handleSaveChanges = (savedData) => {
    const updated = savedRequests.map((item) =>
      item.id === savedData.id ? savedData : item
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
          <NoResults />
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
