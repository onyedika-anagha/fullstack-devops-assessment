import { Button } from "antd";
import AppLogoIcon from "../icons/app-logo-icon";
import BackIcon from "../icons/back-icon";
import "@/styles/header.scss";
import DocumentUploadIcon from "../icons/upload";
import DotsIcon from "../icons/dots";

function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__left">
          <BackIcon className="header__icon" />
          <AppLogoIcon className="header__logo" />
        </div>
        <div className="header__right">
          <Button
            color="primary"
            variant="outlined"
            icon={<DocumentUploadIcon />}
          >
            Import JSON
          </Button>
          <Button color="primary" variant="outlined">
            Publish
          </Button>
          <Button type="primary">Save</Button>
          <Button type="text" icon={<DotsIcon />} />
        </div>
      </div>
    </header>
  );
}

export default Header;
