import { Routes, Route } from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import MainPage from "./components/pages/MainPage";
import SavedQueries from "./components/SavedQueries";
import UserAuth from "./components/UserAuth";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserAuth />} />
        <Route element={<PrivateRoute />}>
          <Route path="/menu" element={<><MainPage /> </>} />
          <Route path="/favourites" element={<SavedQueries />} />
        </Route>
      </Routes >
    </>
  );
}

export default App;
