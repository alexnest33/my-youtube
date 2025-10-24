import { UnorderedListOutlined } from "@ant-design/icons";
import { AppstoreOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ViewToggle = ({ viewMode, setViewMode }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 16,
        gap: 8,
      }}
    >
      <Button
        type={viewMode === "list" ? "primary" : "default"}
        icon={<UnorderedListOutlined />}
        onClick={() => setViewMode("list")}
        title="Список"
      />
      <Button
        type={viewMode === "grid" ? "primary" : "default"}
        icon={<AppstoreOutlined />}
        onClick={() => setViewMode("grid")}
        title="Сетка"
      />
    </div>
  );
};

export default ViewToggle;
