import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <footer className=" flex">
      <ul className="flex">
        <li>
          <a href="">About</a>
        </li>
        <li>
          <a href="">Projects</a>
        </li>
        <li>
          <a href="">Speaking</a>
        </li>
        <li>
          <a href="">Uses</a>
        </li>
      </ul>
      <div className="footer__copyright">
        <p>© 2025 All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
