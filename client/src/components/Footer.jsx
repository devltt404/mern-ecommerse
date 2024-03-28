import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-white mt-8">
      <div
        className="footer container py-8 grid grid-cols-12 gap-12 
      [&>div>ul]:flex [&>div>ul]:flex-col [&>div>ul]:gap-4 [&>div>ul]:text-gray-300 [&>div>ul]:text-sm
      [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 
      "
      >
        <div className="col-span-4">
          <h3>About us</h3>
          <p className="footer-text text-sm leading-6">
            My Shop is a demo e-commerce website built with React, Redux, and
            Tailwind CSS. This project is for educational purposes only.
          </p>
        </div>

        <div className="col-span-2">
          <h3>Service</h3>

          <ul>
            <li>
              <Link>Shipping & Returns</Link>
            </li>
            <li>
              <Link>Privacy Policy</Link>
            </li>
            <li>
              <Link>Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        <div className="col-span-3">
          <h3>Contact</h3>

          <ul>
            <li>
              <p className="leading-6">
                Address: 803 Hillary Pike, Howeborough, MI 59270-9431
              </p>
            </li>
            <li>
              <p>Phone: +1 123 456 7890</p>
            </li>
            <li>
              <Link to="mailto:ductripham@usf.edu">
                Email: ductripham@usf.edu
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-3">
          <h3>Get in touch</h3>

          <div className="flex gap-4">
            <Link to="/" className="footer-text">
              <FaGithub size={22} />
            </Link>
            <Link to="/" className="footer-text">
              <FaFacebook size={22} />
            </Link>
            <Link to="/" className="footer-text">
              <FaInstagram size={22} />
            </Link>
          </div>
        </div>
      </div>

      <p className="text-center py-4 footer-text text-sm">
        &copy; 2024 My Shop. All rights reserved | Made by devltt404
      </p>
    </div>
  );
};

export default Footer;
