import { useSelector } from "react-redux";
import StatisticsCounter from "../StatisticsCounter";

const VideoList = ({ viewMode }) => {
  const url = import.meta.env.VITE_YOUTUBE_ID || "https://www.youtube.com/watch?v="
  const { items } = useSelector((store) => store.content)
  return (
    <div className={`video-list ${viewMode}`}>
      {items.map((item) => (
        <div key={item.id.videoId} className="video-item">
          <a
            href={`${url}${item.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
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
      ))}
    </div>
  );
};

export default VideoList;
