import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="md:flex justify-between p-5 border-b border-gray-300">
      <p className="text-gray-500 text-center">
        Copyright © 2025{" "}
        <span className="text-primary font-semibold">
          <Link to="https://fuad-talukder.vercel.app/" target="__blank">
            Fuad
          </Link>
        </span>
        . <span className="block md:inline">All rights reserved.</span>
      </p>
      <p className="text-secondary font-semibold text-center">Version 1.0.1</p>
    </footer>
  );
};

export default Footer;
