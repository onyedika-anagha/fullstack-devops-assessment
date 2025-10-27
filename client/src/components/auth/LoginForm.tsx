import "@/styles/login-form.scss";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { login } from "@/store/slices/authSlice";

export default function LoginForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values: { email: string; password: string }) => {
    const result = await dispatch(login(values));

    if (login.fulfilled.match(result)) {
      messageApi.success("Login successful!");
      setTimeout(() => navigate("/dashboard"), 800);
    } else {
      messageApi.error(result.payload as string);
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="login"
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
