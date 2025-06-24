import breadCrumpSeparator from "@/assets/breadcrumb-separator.svg";
import { Link } from "react-router";

function Header() {
  return (
    <div className="text-x flex items-center gap-4">
      <Link to="/">Projects</Link>
      <img className="size-4" src={breadCrumpSeparator} alt="" />
      <p className="text-muted-foreground">Model Studio</p>
    </div>
  );
}

export default Header;
