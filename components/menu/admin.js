import React from "react";
import Cookie from "js-cookie";
import Router from "next/router";
import { toast } from "react-toastify";
import { Button, Form, Nav } from "react-bootstrap";

export default function Admin({ handleClick }) {
  const logout = () => {
    Cookie.remove("id");
    Cookie.remove("token");
    Cookie.remove("role");

    toast.success("Logout Berhasil!", {
      position: toast.POSITION.TOP_RIGHT,
    });

    setTimeout(() => {
      Router.push("/");
    }, 50);
  };

  return (
    <>
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: "100px" }}
        navbarScroll
      >
        <Nav.Link onClick={() => handleClick("/admin/member")}>Member</Nav.Link>
        <Nav.Link onClick={() => handleClick("/admin/peminjaman")}>
          Peminjaman
        </Nav.Link>
        <Nav.Link onClick={() => handleClick("/admin/books")}>Buku</Nav.Link>
      </Nav>
      <Form className="d-flex">
        <Button className="btn-log" onClick={() => logout()}>
          Logout
        </Button>
      </Form>
    </>
  );
}
