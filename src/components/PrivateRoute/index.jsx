import { Navigate, Outlet } from "react-router"

const PrivateRoute = () => {
    const isAuth = localStorage.getItem('token')
    return isAuth ? <Outlet /> : <Navigate to="/" replace />
}



export default PrivateRoute

