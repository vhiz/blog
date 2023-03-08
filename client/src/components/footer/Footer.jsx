import "./footer.scss";
import LogoLight from "../../icon/logol.png";
import LogoDark from "../../icon/logod.png";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkmodeContext";
export default function Footer() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <footer>
      {darkMode ? (
        <img src={LogoDark} alt="" />
      ) : (
        <img src={LogoLight} alt="" />
      )}
      <span>
        Get updates daily with <b>Jerry</b>
      </span>
    </footer>
  );
}
