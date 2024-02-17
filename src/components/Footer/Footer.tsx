import Logo from "@assets/img/Logo";
import { Content } from "@components/Content/Content";
import "./styles.css";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { FacebookIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer">
      <Content>
        <div className="footer-content">
          <Logo />
          <p className="text-sm">Juntos Somos Mais Fidelização S.A.</p>
          <p className="text-xs">Siga-nos nas redes sociais:</p>
          <div className="footer-logos">
            <div className="footer-logos__item">
              <FacebookIcon />
            </div>
            <div className="footer-logos__item">
              <LinkedInLogoIcon />
            </div>
            <div className="footer-logos__item">
              <InstagramLogoIcon />
            </div>
          </div>
        </div>
      </Content>
    </footer>
  );
}
