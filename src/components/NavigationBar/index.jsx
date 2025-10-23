import { useNavigate } from "react-router";
import { Button } from "antd";

const NavigationBar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const favourites = () => {
    navigate("/favourites");
  };

  const searchRedirect = () => {
    navigate("/menu");
  };

  return (
    <div className="header">
      <div className="left_side">
        <img src="sibdev-logo.png" alt="" height="40px" />
        <Button type="link" variant="solid" onClick={searchRedirect}>
          Поиск
        </Button>
        <Button type="link" variant="solid" onClick={favourites}>
          Избранное
        </Button>
      </div>

      {localStorage.getItem("token") ? (
        <Button type="link" variant="solid" onClick={logOut}>
          Выйти
        </Button>
      ) : (
        <p>Войдите в свой аккаунт</p>
      )}
    </div>
  );
};

export default NavigationBar;
