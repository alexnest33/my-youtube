import { useSelector } from "react-redux";
import { Row, Card, Col } from "antd";

const VideoList = () => {
  const url = import.meta.env.VITE_YOUTUBE_ID;
  const { items } = useSelector((store) => store.content);

  return (
    <>
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

export default VideoList;
