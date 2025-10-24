export const getFormaData = () =>
  JSON.parse(localStorage.getItem("forma")) || [];
