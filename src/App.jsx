import { Routes, Route } from "react-router";
import Authorization from "./components/Authorization";
import PrivateRoute from "./components/PrivateRoute";
import Favourites from "./components/Favourites";
import "./App.css";
import MainPage from "./components/pages/MainPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Authorization />} />
        <Route element={<PrivateRoute />}>
          <Route path="/menu" element={<><MainPage /> </>} />
          <Route path="/favourites" element={<Favourites />} />
        </Route>
      </Routes >
    </>
  );
}

export default App;
