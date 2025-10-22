import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Checkbox, Form, Input, message } from "antd";
import { login } from "../../redux/authSlice";

const Authorization = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    dispatch(login(values));
    navigate("/menu");
  };
  const onFinishFailed = (errorInfo) => {
    messageApi.info("Неправильный логин или пароль");
    dispatch(login(errorInfo));
    form.resetFields();
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 400,
          height: "50vh",
          width: "100%",
          border: "1px solid #d9d9d9",
          borderRadius: 8,
          padding: "24px 80px",
          backgroundColor: "white",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <img
            src="sibdev-logo.png"
            alt="SibDev Logo"
            height="50px"
            style={{ marginBottom: 8 }}
          />
          <h2 style={{ textAlign: "center", margin: 0 }}>
            Войдите в свой аккаунт
          </h2>
        </div>
        {contextHolder}
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Сохранить</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Authorization;
