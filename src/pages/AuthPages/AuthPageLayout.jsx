import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router-dom"; // Gantilah "react-router" dengan "react-router-dom"

export default function AuthLayout({ children }) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img
                  width={231}
                  height={28}
                  src="images/logo/logo-rs.png"
                  alt="Logo"
                />
              </Link>
              <h1 className="text-center text-gray-400 dark:text-gray-900 text-2xl font-bold">
                RUMAH SAKIT UMUM DAERAH DAYAKU RAJA
              </h1>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
}
