import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router';

const Authorization = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = values => {
        dispatch(login(values))
        navigate('/content')
        console.log('Success:', values);

    };
    const onFinishFailed = errorInfo => {
        dispatch(login(errorInfo))
        console.log('Failed:', errorInfo);
    }





    return (

        <>
            <Form
                name="basic"

                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}

                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}


export default Authorization;


//посмотреть примеры
//решать задачи 
// смотреь ответ если не знаешь
// нужны готовые примеры
// localStorage.setItem('token")