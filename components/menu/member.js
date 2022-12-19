import React from "react";
import Cookie from "js-cookie";
import Router from "next/router";
import { toast } from "react-toastify";
import { Button, Form, Nav } from "react-bootstrap";

export default function Member({ handleClick, id }) {
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

  const toProfile = () => {
    Router.push("/member/profil/" + id);
  };

  return (
    <>
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: "100px" }}
        navbarScroll
      >
        <Nav.Link onClick={() => handleClick("/member/library")}>
          Library
        </Nav.Link>
        <Nav.Link onClick={() => handleClick("/member/history")}>
          History
        </Nav.Link>
        <Nav.Link onClick={() => handleClick("/member/onlineBook")}>
          E-Book
        </Nav.Link>
      </Nav>
      <Form className="d-flex">
        <Button className="btn-profil" onClick={() => toProfile()}>
          Profile
        </Button>
        <Button className="btn-log" onClick={() => logout()}>
          Logout
        </Button>
      </Form>
    </>
  );
}
