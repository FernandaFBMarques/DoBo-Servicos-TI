import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import "./Layout.css";
import Menu from "../components/Menu/Menu";
import FooterDobo from "../components/FooterDobo/FooterDobo";

export default function Layout() {
  const { pathname } = useLocation();

  const isFormPage = pathname.includes("login")
                  || pathname.includes("cadastro")
                  || pathname.includes("recuperar");

  return (
    <>
       <div className="layout-wrapper">
      <Menu />

      <main className={isFormPage ? "layout-main" : ""}>
        <Outlet />
      </main>

      <FooterDobo />
    </div>
    </>
  );
}