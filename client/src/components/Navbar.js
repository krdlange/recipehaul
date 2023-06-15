import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBBadge,
} from "mdb-react-ui-kit";
import useAuth from "../hooks/useAuth";
function Navbar(props) {
  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);
  const auth = useAuth();
  console.log(auth);
  function handleLogout() {
    auth.signout();
  }
  return (
    <>
      {auth.isLoggedIn ? (
        <MDBNavbar className="bg-nav" expand="lg">
          <MDBContainer fluid>
            <MDBNavbarBrand href="/recipes">Recipe Haul</MDBNavbarBrand>
            <MDBNavbarToggler
              type="button"
              data-target="#navbarColor02"
              aria-controls="navbarColor02"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShowNavColor(!showNavColor)}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
            <MDBCollapse show={showNavColor} navbar>
              <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
                <MDBNavbarItem className="active">
                  <NavLink
                    to="/recipes"
                    style={{ textDecoration: "none" }}
                    className="recipes_search"
                  >
                    <MDBNavbarLink aria-current="page" href="#">
                      Search Recipes
                    </MDBNavbarLink>
                  </NavLink>
                </MDBNavbarItem>
                  <MDBNavbarItem>
                    <NavLink
                      to="/saved_recipes"
                      style={{ textDecoration: "none" }}
                      className="login_signup"
                    >
                      <MDBNavbarLink href="#">Saved Recipes</MDBNavbarLink>
                    </NavLink>
                  </MDBNavbarItem>
     
                  <MDBNavbarItem>
                    <NavLink
                      to="/recipes"
                      style={{ textDecoration: "none" }}
                      className="login_signup"
                    >
                      <MDBNavbarLink href="#" onClick={handleLogout}>
                        Logout
                      </MDBNavbarLink>
                    </NavLink>
                  </MDBNavbarItem>
                {auth.isAdmin ? (
                  <MDBNavbarItem>
                    <NavLink
                      to="/ordersdash"
                      style={{ textDecoration: "none" }}
                      className="admin"
                    >
                      <MDBNavbarLink href="#">Admin</MDBNavbarLink>
                    </NavLink>
                  </MDBNavbarItem>
                ) : (
                  <MDBNavbarItem>
                    <NavLink
                      to="/profile"
                      style={{ textDecoration: "none" }}
                      className="profile"
                    >
                      <MDBNavbarLink href="#">My Profile</MDBNavbarLink>
                    </NavLink>
                  </MDBNavbarItem>
                )}
                <MDBNavbarItem>
                  <NavLink
                    to="/shopping"
                    style={{ textDecoration: "none" }}
                    className="cart"
                  >
                    <MDBNavbarLink href="#">Cart</MDBNavbarLink>
                  </NavLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      ) : (
        <MDBNavbar className="bg-nav" expand="lg">
          <MDBContainer fluid>
            <MDBNavbarBrand href="/recipes">Recipe Haul</MDBNavbarBrand>
            <MDBNavbarToggler
              type="button"
              data-target="#navbarColor02"
              aria-controls="navbarColor02"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShowNavColor(!showNavColor)}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
            <MDBCollapse show={showNavColor} navbar>
              <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
                <MDBNavbarItem className="active">
                  <NavLink
                    to="/recipes"
                    style={{ textDecoration: "none" }}
                    className="recipes_search"
                  >
                    <MDBNavbarLink aria-current="page" href="#">
                      Search Recipes
                    </MDBNavbarLink>
                  </NavLink>
                </MDBNavbarItem>
                  <MDBNavbarItem>
                    <NavLink
                      to="/login"
                      style={{ textDecoration: "none" }}
                      className="login_signup"
                    >
                      <MDBNavbarLink
                        href="#"
                        onClick={() => console.log("here")}
                      >
                        Login/Register
                      </MDBNavbarLink>
                    </NavLink>
                  </MDBNavbarItem>
                <MDBNavbarItem>
                  <NavLink
                    to="/shopping"
                    style={{ textDecoration: "none" }}
                    className="cart"
                  >
                    <MDBNavbarLink href="#">Cart</MDBNavbarLink>
                  </NavLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      )}
    </>
  );
}
export default Navbar;