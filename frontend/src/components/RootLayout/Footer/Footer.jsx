import React from "react";
import qrCode from "../../../assets/QrCode.png";
import playStore from "../../../assets/playStore.png";
import appstore from "../../../assets/download-appstore.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white py-10 px-6">
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {/* Exclusive */}
          <div>
            <h3 className="text-xl font-bold mb-3">Exclusive</h3>
            <p className="text-sm mb-2">Subscribe</p>
            <p className="text-sm mb-3">Get 10% off your first order</p>
            <div className="flex border border-gray-600 rounded overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 bg-transparent text-sm w-full outline-none"
              />
              <button className="bg-white cursor-pointer text-black px-3 py-2 text-sm">
                ➤
              </button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <p className="text-sm mb-1">
              <a href="mailto:exclusive@gmail.com" className="hover:underline">
                exclusive@gmail.com
              </a>
            </p>

            <p className="text-sm">
              <a href="tel:+8801588889999" className="hover:underline">
                +88015-88888-9999
              </a>
            </p>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Account</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/account">My Account</Link>
              </li>
              <li>
                <Link to="/login">Login / Register</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/wishlist">Wishlist</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Link</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms Of Use</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Download App</h3>
            <p className="text-sm mb-2">Save $3 with App New User Only</p>
            <div className="mb-2 flex gap-3">
              <div>
                <img src={qrCode} alt="QR" className="w-20 h-20 mb-2" />
              </div>
              <div className=" flex-column gap-2">
                <img
                  src={playStore}
                  alt="Google Play"
                  className="w-auto pb-2"
                />
                <img src={appstore} alt="App Store" className="w-auto" />
              </div>
            </div>
            <div className="flex gap-4 mt-3 text-xl">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-400 border-t pt-4">
          © Copyright Rimel 2022. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
