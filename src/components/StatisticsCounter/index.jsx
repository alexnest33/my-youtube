import { useEffect, useState } from "react";
import axios from "axios";

const StatisticsCounter = ({ id }) => {
  const [views, setViews] = useState(0);
  const getCountViews = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "statistics",
            id: id,
            key: import.meta.env.VITE_YOUTUBE_API_KEY,
          },
        }
      );
      setViews(response.data.items[0].statistics.viewCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountViews();
  }, []);

  return (
    <>
      <p>Количество просмотров: {views} просмотров</p>
    </>
  );
};

export default StatisticsCounter;
