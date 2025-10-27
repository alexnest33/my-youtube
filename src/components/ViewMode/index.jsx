import { UnorderedListOutlined } from "@ant-design/icons";
import { AppstoreOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ViewToggle = ({ viewMode, setViewMode }) => {
  return (
    <div className="view-mode-switcher">
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
