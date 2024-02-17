import LogoSvg from "@assets/img/Logo";
import { Content } from "@components/Content/Content";
import { Link } from "react-router-dom";
import { SearchBarController } from "./components/SearchBarController";
import { UserNav } from "./components/UserNav";

const Logo = () => (
  <div className="w-[148px]">
    <LogoSvg />
  </div>
);

export function Header() {
  return (
    <header
      className="h-[96px] min-h-[96px] flex items-center sticky top-0 z-10"
      style={{ background: "hsl(var(--jsm-muted))" }}
    >
      <Content
        parentNodeClassName="w-full"
        childNodeClassName="flex items-center justify-between "
      >
        <Link to="/">
          <Logo />
        </Link>
        <SearchBarController />
        <UserNav />
      </Content>
    </header>
  );
}
