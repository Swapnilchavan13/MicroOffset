import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center cursor-pointer">
      <img
        src="https://iili.io/qqSzgpf.png"
        alt="Logo"
        className="h-20 w-auto object-contain"
      />
    </Link>
  );
};

export default Logo;