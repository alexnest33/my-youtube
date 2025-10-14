import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../../redux/contentSlice";
import { Card, Button, Row, Col } from "antd";
import Header from "../Header";
import InputSearchContent from "../InputSearchContent";
import VideoList from "../VideoList";

const Favourites = () => {
    const url = import.meta.env.VITE_YOUTUBE_ID;
    const [savedRequests, setSavedRequests] = useState([]);
    const dispatch = useDispatch();
    const { items } = useSelector((store) => store.content);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("forma")) || [];
        setSavedRequests(data);
    }, []);

    const handleDelete = (id) => {
        setSavedRequests((prevState) => {
            const newState = prevState.filter((item) => item.id !== id);
            localStorage.setItem("forma", JSON.stringify(newState));
            return newState;
        });
    };

    console.log(savedRequests);

    return (
        <>
            <div>
                <Header />
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
                                        <Button
                                            type="primary"
                                            style={{ marginRight: 8 }}
                                            onClick={() =>
                                                dispatch(
                                                    getVideos({
                                                        text: item.name,
                                                        maxResults: item.maxResults,
                                                    })
                                                )
                                            }
                                        >
                                            Выполнить
                                        </Button>
                                        <Button onClick={() => handleDelete(item.id)}>
                                            Удалить
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <p>Пока нет сохранённых запросов 😔</p>
                    )}
                </div>
            </div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {items.map((item) => {
                    return (
                        <Col key={item.id.videoId} span={8}>
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
                        </Col>
                    );
                })}
            </Row>
        </>
    );
};

export default Favourites;
