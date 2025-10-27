import { Card } from "antd";
import ExecuteQuery from "../ExecuteQuery";
import EditQuery from "../EditQuery";
import DeleteQuery from "../DeleteQuery";

const SavedQuerisList = ({
  savedRequests,
  setChangeModal,
  setSavedRequests,
}) => {
  return (
    <>
      {savedRequests.map((item) => (
        <Card
          key={item.id}
          style={{ marginBottom: 4, padding: 0, borderRadius: 4 }}
          bodyStyle={{ padding: "2px 8px" }}
        >
          <div className="savedQueriesCard">
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
      ))}
    </>
  );
};

export default SavedQuerisList;
