import { Link } from "react-router-dom";

const Logo = () => {
   const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
  return (
    <Link to="/" className="flex items-center cursor-pointer">
      <img
        src="https://iili.io/qCpAzep.png"
        alt="Logo"
         onClick={scrollToTop}
        className="h-20 w-auto object-contain"
      />
    </Link>
  );
};

export default Logo;