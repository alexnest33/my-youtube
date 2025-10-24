import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideos } from "../../redux/slices/contentSlice";
import StatisticsCounter from "../StatisticsCounter";
import ViewMode from "../ViewMode";

const VideoGallery = () => {

  const url = import.meta.env.VITE_YOUTUBE_ID;
  const [viewMode, setViewMode] = useState("list");

  const { items } = useSelector((store) => store.content);
  const { active } = useSelector((store) => store.saveInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideos({ name: active.name, maxResults: active.maxResults }));
  }, [active]);

  return (
    <>
      {(items && items.length > 0) && (
        <ViewMode viewMode={viewMode} setViewMode={setViewMode} />
      )}

      <div className={`video-list ${viewMode}`}>
        {!items || items.length === 0 ? (
          <p className="no-videos">Ничего не найдено</p>
        ) : (
          items.map((item) => (
            <div key={item.id.videoId} className="video-item">
              <a href={`${url}${item.id.videoId}`} target="_blank">
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt={item.snippet.title}
                />
              </a>
              <div className="video-info">
                <h3>{item.snippet.title}</h3>
                <p>{item.snippet.channelTitle}</p>
                <StatisticsCounter id={item.id.videoId} />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default VideoGallery;
