import React from "react";
import { Card, Col, Row } from "antd";
import Router from "next/router";

const CardComp = () => {
  const handleClick = (path) => {
    Router.push(path);
  };

  return (
    <div className="site-card-wrapper">
      <Row gutter={40} className="row-card">
        <Col span={6} className="col-card-register">
          <Card
            bordered={false}
            hoverable
            className="card-index card-register"
            onClick={() => handleClick("/auth/register")}
          >
            <h3>Register</h3>
            <p>Registrasi anggota.</p>
          </Card>
        </Col>
        <Col span={6} className="col-card-login">
          <Card
            bordered={false}
            hoverable
            className="card-index card-login"
            onClick={() => handleClick("/auth/login")}
          >
            <h3>Login</h3>
            <p>Login sebagai anggota.</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default CardComp;
