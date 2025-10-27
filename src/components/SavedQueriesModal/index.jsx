
import { useSelector, useDispatch } from "react-redux";
import { changeRequest } from "../../redux/slices/saveInfoSlice";
import AddToFavoritesModal from "../AddToFavoritesModal"

const SavedQueriesModal = ({ changeModal, cancelModal, handleSaveChanges }) => {
  const { active } = useSelector((store) => store.saveInfo);
  const dispatch = useDispatch();


  const handleSaveEdit = (savedData) => {
    console.log("Данные из модалки:", savedData);
    dispatch(changeRequest(savedData));
    handleSaveChanges()
  };

  return (
    <AddToFavoritesModal
      isModalOpen={changeModal}
      setIsModalOpen={cancelModal}
      isEditMode={true}                    
      editData={active}                    
      onSaveEdit={handleSaveEdit}          
    />
  );
};

export default SavedQueriesModal;
