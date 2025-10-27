import AppLogoIcon from "@/components/icons/app-logo-icon";
import { Link } from "react-router";

function AuthLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="login-page__left">
        <div className="login-page__left__wrapper">
          <Link to={"/"} className="login-page__logo">
            <AppLogoIcon className="login-page__icon" />
            <span>Form Builder.</span>
          </Link>
          <div className="login-page__text">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          {children}
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="login-page__right">
        <img
          src="https://loctech-team.vercel.app/_next/static/media/download.0dee251d.webp"
          alt="Illustration"
          className="login-page__image"
        />
        <div className="login-page__right__overlay" />
      </div>
    </div>
  );
}

export default AuthLayout;
