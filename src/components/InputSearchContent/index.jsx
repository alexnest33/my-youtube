import { useState } from "react";
import { getVideos } from "../../redux/contentSlice";
import { Input, Button, Flex } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import LikeModalForm from "../LikeModalForm";
import VideoList from "../VideoList";
import { useDispatch } from "react-redux";

const InputSearchContent = () => {
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    if (text.trim() === "") {
      alert("Error");
    } else {
      localStorage.getItem("text");
      dispatch(getVideos(text));
    }
  };

  const suffix = (
    <HeartOutlined
      style={{
        fontSize: 18,
        color: "#1677ff",
      }}
      onClick={showModal}
    />
  );

  return (
    <>
      <Flex
        justify="center"
        align="center"
        gap="small"
        style={{ marginTop: 60 }}
      >
        <Input
          className="search-input"
          size="middle"
          value={text}
          onChange={handleChange}
          placeholder="Поиск..."
          suffix={suffix}
        />
        <Button type="primary" variant="solid" onClick={handleClick}>
          НАЙТИ
        </Button>
      </Flex>
      <LikeModalForm
        text={text}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <VideoList />
    </>
  );
};

export default InputSearchContent;


