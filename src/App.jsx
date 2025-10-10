import './App.css'
import Authorization from './components/Authorization'
import { Routes, Route, Navigate } from 'react-router'
import PrivateRoute from './components/PrivateRoute'
import InputSearchContent from './components/InputSearchContent'
import Header from './components/Header'

function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Authorization />} />
        <Route element={<PrivateRoute />}>
          <Route path="/content" element={<InputSearchContent />} />
        </Route>
        

      </Routes>


    </>
  )
}

export default App


