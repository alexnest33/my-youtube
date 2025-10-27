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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideos({ name: active.name, maxResults: active.maxResults }));
  }, [active]);

  return (
    <>
      {items && items.length > 0 && (
        <ViewMode viewMode={viewMode} setViewMode={setViewMode} />
      )}

      <div className={`video-list ${viewMode}`}>
        {items.length === 0 ? (
          <NoResults />
        ) : (
          <VideoList items={items} viewMode={viewMode} />
        )}
      </div>
    </>
  );
};

export default VideoGallery;
