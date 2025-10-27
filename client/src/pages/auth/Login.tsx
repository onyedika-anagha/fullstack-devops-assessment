import "@/styles/login-page.scss";
import LoginForm from "@/components/auth/LoginForm";
import { Link } from "react-router";
import { Typography } from "antd";
import AuthLayout from "@/layout/AuthLayout";
import { authLinks } from "@/lib/utils";

const { Text } = Typography;

export default function LoginPage() {
  return (
    <AuthLayout
      title="Log in to your account"
      description="Enter your email and password below to log in"
    >
      <>
        <div className="login-page__form-wrapper">
          <LoginForm />
        </div>

        <div className="auth-footer">
          <Text>
            Don't have an account?{" "}
            <Link to={authLinks.register}>Sign up here</Link>
          </Text>
        </div>
      </>
    </AuthLayout>
  );
}
