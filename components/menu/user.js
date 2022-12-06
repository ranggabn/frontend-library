import React from "react";
import { Nav } from "react-bootstrap";

export default function User({ handleClick }) {
  return (
    <>
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: "100px" }}
        navbarScroll
      >
        <Nav.Link onClick={() => handleClick("/")}>Home</Nav.Link>
        <Nav.Link onClick={() => handleClick("/user/userLibrary")}>
          Library
        </Nav.Link>
        <Nav.Link onClick={() => handleClick("/user/about")}>
          Tentang Kami
        </Nav.Link>
        <Nav.Link onClick={() => handleClick("/user/tnc")}>
          Syarat & Ketentuan
        </Nav.Link>
      </Nav>
    </>
  );
}
