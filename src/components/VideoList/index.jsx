import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { AppstoreOutlined } from "@ant-design/icons";
import { getVideos } from "../../redux/contentSlice";
import ViewCount from "../ViewCount";

const VideoList = () => {
  const url = import.meta.env.VITE_YOUTUBE_ID;

  const [menu, setMenu] = useState("list")

  const { items } = useSelector((store) => store.content);
  const { active } = useSelector(store => store.saveInfo)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVideos({ name: active.name, maxResults: active.maxResults }))
  }, [active])

  console.log(active)
  return (
    <>
      {items.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 16,
            gap: 8,
          }}
        >
          <Button
            type={menu === "list" ? "primary" : "default"}
            icon={<UnorderedListOutlined />}
            onClick={() => setMenu("list")}
          />
          <Button
            type={menu === "grid" ? "primary" : "default"}
            icon={<AppstoreOutlined />}
            onClick={() => setMenu("grid")}
          />
        </div>
      )}

      <div className={`video-list ${menu}`}>
        {items.length === 0 ? (
          <p className="no-videos">Ничего не найдено</p>
        ) : (
          items.map((item) => (
            <div key={item.id.videoId} className="video-item">
              <a href={`${url}${item.id.videoId}`} target="_blank">
                <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
              </a>
              <div className="video-info">
                <h3>{item.snippet.title}</h3>
                <p>{item.snippet.channelTitle}</p>
                <ViewCount id={item.id.videoId} />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default VideoList;
