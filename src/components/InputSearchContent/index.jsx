import { useState, useEffect, useRef } from "react";
import { getVideos } from "../../redux/contentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Flex } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import LikeModalForm from "../LikeModalForm";
import { saving } from "../../redux/saveInfoSlice";
import VideoList from "../VideoList";


const InputSearchContent = () => {
  const [text, setText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef()
  const dispatch = useDispatch();




  useEffect(() => {
    ref.current.focus()
  }, [])

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
      dispatch(saving({ name: text, sorted: 'relevance' }))
      setText("");
    }
  };

  const suffix = isLiked ? (
    <HeartFilled
      style={{
        fontSize: 18,
        color: "blue",
        cursor: "pointer",
      }}
      onClick={showModal}
    />
  ) : (
    <HeartOutlined
      style={{
        fontSize: 18,
        color: "#1677ff",
        cursor: "pointer",
      }}
      onClick={showModal}
    />
  );

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("forma")) || [];
    setIsLiked(data.some((item) => item.name === text));
  }, [text]);

  return (
    <>
      <Flex
        vertical
        justify="center"
        align="center"
        gap="small"
        style={{ marginTop: 60, fontSize: 12 }}
      >
        <h1>Поиск видео </h1>
      </Flex>
      <Flex
        justify="center"
        align="center"
        gap="small"
        style={{ marginTop: 10 }}
      >
        <Input
          className="search-input"
          size="middle"
          value={text}
          onChange={handleChange}
          placeholder="Поиск..."
          suffix={suffix}
          ref={ref}

        />
        <Button type="primary" variant="solid" onClick={handleClick} >
          НАЙТИ
        </Button>
      </Flex>
      <LikeModalForm
        text={text}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setText={setText}
        setIsLiked={setIsLiked}
      />
    </>
  );
};

export default InputSearchContent;
