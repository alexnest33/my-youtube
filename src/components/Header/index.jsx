import { useNavigate } from "react-router"
import { Button } from "antd"

const Header = () => {


    const navigate = useNavigate()

    const logOut = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <>
            <div className="header">
                <div className="left_side">
                    <img src="sibdev-logo.png" alt="" />
                    <Button type="primary" variant="solid"  >Поиск</Button>
                    <Button type="primary" variant="solid"  >Избранное</Button>
                </div>
                {localStorage.getItem("token") ?
                    <Button type="primary" variant="solid" onClick={logOut}>Выйти</Button> : <p>Войдите в свой аккаунт</p>}
            </div>
        </>
    )
}

export default Header