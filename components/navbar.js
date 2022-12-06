import React from "react";
import { Container, Navbar } from "react-bootstrap";
import Router from "next/router";
import Member from "./menu/member";
import User from "./menu/user";
import Admin from "./menu/admin";

export default function NavbarComp({ token, role }) {
  const handleClick = (path) => {
    Router.push(path);
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#">Perpustakaan UB</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {token && role == "1" ? (
            <Member handleClick={handleClick} />
          ) : token && role == "2" ? (
            <Admin handleClick={handleClick} />
          ) : (
            <User handleClick={handleClick} />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
