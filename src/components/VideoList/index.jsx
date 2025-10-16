import { useSelector, useDispatch } from "react-redux";
import { Row, Card, Col } from "antd";
import { getVideos } from "../../redux/contentSlice";
import { useEffect } from 'react'

const VideoList = () => {
  const url = import.meta.env.VITE_YOUTUBE_ID;
  const { items } = useSelector((store) => store.content);
  const { active } = useSelector(store => store.saveInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVideos({ name: active.name, maxResults: active.maxResults }))
  }, [active])

  console.log(active)
  return (
    <>
      {items.length > 0 ?
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
        </Row> : <p className="zerovideo" >Введите в поиске интересующий вас запрос!</p>}
    </>
  );
};

export default VideoList;
