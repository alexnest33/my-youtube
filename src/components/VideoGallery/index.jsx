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
  }, [active, dispatch]);

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
