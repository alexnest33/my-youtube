import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

const StatisticsCounter = ({ id }) => {
  const url = import.meta.env.VITE_YOUTUBE_QUERY;
  const [views, setViews] = useState(0);
  const getCountViews = async () => {
    try {
      const response = await axios.get(`${url}/videos`, {
        params: {
          part: "statistics",
          id: id,
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
      });
      setViews(response.data.items[0].statistics.viewCount);
    } catch (error) {
      message.error("Статистика по просмотрам недоступна");
    }
  };

  useEffect(() => {
    getCountViews();
  }, [id]);

  return <p>Количество просмотров: {views} просмотров</p>;
};

export default StatisticsCounter;
