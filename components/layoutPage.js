import React, { useEffect, useState } from "react";
import NavbarComp from "./navbar";
import { Layout } from "antd";
import Cookies from "js-cookie";
import FooterComp from "./footer";

const { Content } = Layout;

export default function LayoutPage({ children }) {
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    Cookies.get("token") ? setAuth(true) : setAuth(false);
    Cookies.get("role") ? setRole(Cookies.get("role")) : setRole("");
    Cookies.get("id") ? setId(Cookies.get("id")) : setId("");
  }, [Cookies.get("token"), Cookies.get("role"), Cookies.get("id")]);

  return (
    <>
      <Layout>
        <NavbarComp
          className="navbar-dashboard"
          token={auth}
          role={role}
          id={id}
        />
        <Content className="content-dashboard">{children}</Content>
        <FooterComp />
      </Layout>
    </>
  );
}
