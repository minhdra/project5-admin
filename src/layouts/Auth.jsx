import React from "react";
import { Outlet } from "react-router-dom";

// components

import Navbar from "../components/Shared/Navbars/AuthNavbar.jsx";
import FooterSmall from "../components/Shared/Footers/FooterSmall.jsx";

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-slate-700 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("../assets/img/register_bg_2.png") + ")",
            }}
          ></div>
          <Outlet />
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
