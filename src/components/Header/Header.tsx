import LogoSvg from "@assets/img/Logo";
import { Content } from "@components/Content/Content";
import { Link } from "react-router-dom";
import { SearchBarController } from "./components/SearchBarController";
import { UserNav } from "./components/UserNav";
import "./Header.styles.css";

export function Header() {
  return (
    <header>
      <Content
        parentNodeClassName="w-full"
        childNodeClassName="header-content-child"
      >
        <Link to="/">
          <LogoSvg className="header-logo" />
        </Link>
        <SearchBarController />
        <UserNav />
      </Content>
    </header>
  );
}
