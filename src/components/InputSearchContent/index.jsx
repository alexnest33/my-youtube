import { useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { getVideos } from "../../redux/contentSlice";
import { useSelector } from "react-redux";
import { Input, Button, Flex, Col, Row, Card, Modal, Form } from "antd";
import { HeartOutlined } from "@ant-design/icons";


const InputSearchContent = () => {
    const url = import.meta.env.VITE_YOUTUBE_ID;
    const dispatcher = useDispatch();
    const { items } = useSelector((store) => store.content);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [text, setText] = useState("");



    const formData = {
        title: '',
        name: '',
        maxResults: 15,
        sorted: 'relevance'
    }


    function saveReducer(state, action) {
        switch (action.type) {
            case 'ADD':
                return 
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(saveReducer, formData)
    const handleChange2 = (e) => {
        dispatch({ type: 'ADD', payload: { title: e.target.value, name: e.target.value } })
        console.log(state)
    }


    const showModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleOk = () => {
        setIsModalOpen(false);
        localStorage.setItem("saveRequest", [{
            name: text,
            title: '',
            maxResult: 0,
        }])
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };


    const handleClick = () => {
        if (text.trim() === "") {
            alert("Error");
        } else {
            localStorage.getItem("text");
            dispatcher(getVideos(text));
        }
    }

    const suffix = (
        <HeartOutlined
            style={{
                fontSize: 18,
                color: '#1677ff',
            }}
            onClick={showModal}
        />
    )




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
                <Modal open={isModalOpen} onCancel={closeModal} onOk={handleOk} title="Сохранить запрос"
                    okText="Сохранить"
                    cancelText="Отмена"  >
                    <Form layout="vertical">
                        <Form.Item label="Запрос">
                            <Input value={text} disabled onChange={handleChange} placeholder="Чем кормить кота" />
                        </Form.Item>

                        <Form.Item label="Название">
                            <Input placeholder="Укажите название" onChange={handleChange2} value={state.title} />
                        </Form.Item>
                        <Form.Item label="Сортировать по">
                            <select value={state.sorted} >
                                <option value="relevance">По релевантности</option>
                                <option value="date">По дате</option>
                                <option value="rating">По рейтингу</option>
                                <option value="viewCount">По просмотрам</option>
                            </select>
                        </Form.Item>

                        <Form.Item label="Максимальное количество">
                            <input type="number" value={state.maxResults} />
                        </Form.Item>
                    </Form>
                </Modal>

                <Button type="primary" variant="solid" onClick={handleClick}>
                    НАЙТИ
                </Button>
            </Flex >



            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {items.map((item) => {
                    return (

                        <Col key={item.id.videoId} span={8}>

                            {/* <li> */}
                            <Card
                                hoverable
                                variant="undefined"
                                styles={{ padding: 0, marginTop: 30 }}
                            >
                                <a href={`${url}${item.id.videoId}`} target="_blank">
                                    <img
                                        src={item.snippet.thumbnails.medium.url}
                                        alt={item.snippet.title}
                                        style={{ width: "100%", borderRadius: "8px" }}
                                    />
                                </a>
                                <div style={{ marginTop: "8px" }}>
                                    <h3
                                        style={{
                                            margin: 0,
                                            fontSize: "16px",
                                            fontWeight: 500,
                                            color: "black",
                                        }}
                                    >
                                        {item.snippet.title}
                                    </h3>
                                    <p style={{ margin: 0, fontSize: "14px", color: "#606060" }}>
                                        {item.snippet.channelTitle}
                                    </p>
                                </div>
                            </Card>
                            {/* </li> */}
                        </Col>
                    );
                })}
            </Row>
        </>
    );
};

export default InputSearchContent;



//сделать лайк
// при клике открывается форма
// при клике превращается в обьетк
// и добавляется вл окал стораже
// и добавляется в массив обьектов