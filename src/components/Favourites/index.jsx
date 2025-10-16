import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../../redux/contentSlice";
import { Card, Button, Row, Col } from "antd";
import Header from "../Header";
import InputSearchContent from "../InputSearchContent";
import VideoList from "../VideoList";
import { useNavigate } from "react-router";
import { saving } from "../../redux/saveInfoSlice";

const Favourites = () => {
    const url = import.meta.env.VITE_YOUTUBE_ID;
    const [savedRequests, setSavedRequests] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const handleClick = (id) => {
        const result = savedRequests.find((item) => item.id === id);
        dispatch(saving(result))
        navigate("/menu")
    };



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
                                            onClick={() => handleClick(item.id)}
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
        </>
    );
};

export default Favourites;
