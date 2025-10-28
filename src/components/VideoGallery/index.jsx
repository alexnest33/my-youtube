import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideos } from "../../redux/slices/contentSlice";
import VideoList from "../VideoList";
import ViewMode from "../ViewMode";
import NoResults from "../NoResults";

const VideoGallery = () => {
  const [viewMode, setViewMode] = useState("list");

  const { items } = useSelector((store) => store.content);
  const { active } = useSelector((store) => store.saveInfo);
  console.log('API Key:', import.meta.env.VITE_YOUTUBE_API_KEY);
  console.log('YouTube URL:', import.meta.env.VITE_YOUTUBE_ID);
  console.log('YouTube Query:', import.meta.env.VITE_YOUTUBE_QUERY);
  console.log('Production items:', items);
  console.log('First item structure:', items?.[0])


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideos({ name: active.name, maxResults: active.maxResults }));
  }, [active]);

  return (
    <>
      {items && items.length > 0 ? (
        <>
          <ViewMode viewMode={viewMode} setViewMode={setViewMode} />
          <div className={`video-list ${viewMode}`}>
            <VideoList viewMode={viewMode} />
          </div>
        </>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export default VideoGallery;
