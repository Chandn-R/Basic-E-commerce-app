import React from "react";
import { Link, useResolvedPath } from "react-router-dom";
import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import { useProductStore } from "../store/useProductStore";

const Navbar = () => {
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";
  const {products} = useProductStore();

  return (
    <header className="sticky top-0 z-50 bg-indigo-100/90 backdrop-blur-md border-b border-indigo-200 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <ShoppingCartIcon className="w-7 h-7 text-indigo-600" />
            <span className="text-2xl font-semibold text-gray-800 tracking-wide font-sans">
              MyStore
            </span>
          </Link>

          {/* NAVIGATION */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-800 hover:text-indigo-600 transition-colors text-sm font-medium">Home</Link>
            <Link to="/shop" className="text-gray-800 hover:text-indigo-600 transition-colors text-sm font-medium">Shop</Link>
            <Link to="/about" className="text-gray-800 hover:text-indigo-600 transition-colors text-sm font-medium">About</Link>
          </nav>

          {/* CART ICON */}
          {isHomePage && (
            <button className="relative p-2 rounded-full hover:bg-indigo-200 transition-colors">
              <ShoppingBagIcon className="w-6 h-6 text-gray-800" />
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                {products.length}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>



  );
};

export default Navbar;
