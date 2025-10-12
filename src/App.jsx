import "./App.css";
import Authorization from "./components/Authorization";
import { Routes, Route, Navigate } from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import InputSearchContent from "./components/InputSearchContent";
import Header from "./components/Header";
import Favourites from "./components/Favourites";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Authorization />} />
        <Route element={<PrivateRoute />}>
          <Route path="/menu" element={<> <Header />    <InputSearchContent /> </>} />
          <Route path="/favourites" element={<Favourites />  } />
      </Route>
    </Routes >
    </>
  );
}

export default App;
