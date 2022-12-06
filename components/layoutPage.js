import React, { useEffect, useState } from "react";
import NavbarComp from "./navbar";
import { Layout } from "antd";
import Cookies from "js-cookie";
import FooterComp from "./footer";

const { Content } = Layout;

export default function LayoutPage({ children }) {
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState("");
  useEffect(() => {
    Cookies.get("token") ? setAuth(true) : setAuth(false);
    Cookies.get("role") ? setRole(Cookies.get("role")) : setRole("");
  }, [Cookies.get("token"), Cookies.get("role")]);

  return (
    <>
      <Layout>
        <NavbarComp className="navbar-dashboard" token={auth} role={role} />
        <Content className="content-dashboard">{children}</Content>
        <FooterComp />
      </Layout>
    </>
  );
}
