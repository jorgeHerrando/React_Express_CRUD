import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { CgMenu } from "react-icons/cg";
import { CgClose } from "react-icons/cg";

import Logo from "../assets/logo.png";

import LayoutStyles from "./Layout.module.css";

export default function Layout(props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <header>
          <nav>
            <Link to="/">
              <div className={LayoutStyles.logoContainer}>
                <img src={Logo} alt="logo" />
              </div>
            </Link>
            <div className={LayoutStyles.menuNav}>
              <NavLink
                to="/"
                className={`${LayoutStyles.menuNav} btn btn-dark`}
                activeclassname="active"
              >
                Inicio
              </NavLink>
              <NavLink
                to="/createProduct"
                className="btn btn-dark"
                activeclassname="active"
              >
                Crear Producto
              </NavLink>
            </div>
            <div className={LayoutStyles.menuIconContainer}>
              {!open && (
                <CgMenu
                  className={LayoutStyles.menuIcon}
                  onClick={() => setOpen(true)}
                />
              )}
              {open && (
                <CgClose
                  className={LayoutStyles.closeIcon}
                  onClick={() => setOpen(false)}
                />
              )}
              {open && (
                <ul className={LayoutStyles.menuMobileUl}>
                  <Link to="/" className={LayoutStyles.menuItemMobile}>
                    Inicio
                  </Link>
                  <Link
                    to="/createProduct"
                    className={LayoutStyles.menuItemMobile}
                  >
                    Crear Producto
                  </Link>
                </ul>
              )}
            </div>
          </nav>
        </header>
        <main>{props.children}</main>
        <footer>
          <div className={LayoutStyles.footerContainer}>
            <div className={LayoutStyles.infoFooter}>
              <Link to="/">Productos</Link>
            </div>
            <div className={LayoutStyles.infoFooter}>
              Términos y condiciones
            </div>
            <div className={LayoutStyles.infoFooter}>Legales</div>
          </div>
        </footer>
      </div>
    </>
  );
}
