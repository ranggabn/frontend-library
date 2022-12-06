import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Alert, Button, Form, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { api } from "../../components/utils/api";
import qs from "querystring";
import Router from "next/router";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import Link from "next/link";

export default function Login() {
  const [form] = Form.useForm();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    setError(false);
    const bodyRequest = {
      email: data.email,
      password: data.password,
    };

    axios
      .post(api + "auth/api/v1/login", qs.stringify(bodyRequest))
      .then((res) => {
        if (res.data.status === "99") {
          setError(true);
          setMessage(res.data.message);
        } else {
          setError(false);
          Cookie.set("id", res.data.data.id);
          Cookie.set("role", res.data.data.role);
          Cookie.set("token", res.data.token);
          toast.success("Login Berhasil!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          form.resetFields();
          setTimeout(() => {
            Router.push("/member/library");
          }, 50);
        }
      });
  };

  const handleChange = (e) => {
    setError(false);
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData({ ...newData });
  };

  return (
    <Row>
      <Col className="dark-login">
        <img src="/images/login.svg" alt="" height={200} />
      </Col>
      <Col className="col-form-login">
        <Row>
          <img src="/images/logo.svg" alt="" height={100} />
        </Row>
        <Row className="row-form">
          <Col xl={8} md={8} xs={8}>
            {error && (
              <Alert message={message} type="error" showIcon className="mb-3" />
            )}
            <Form
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  placeholder="Input your email"
                  size="large"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  prefix={<UserOutlined />}
                  required
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Input your password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  prefix={<LockOutlined />}
                  size="large"
                  required
                />
              </Form.Item>
              <p>
                Belum mendaftar sebagai anggota?{" "}
                <Link href="/auth/register">Daftar disini.</Link>
              </p>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-login">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="row-index">
            <Link href="/" className="row-index a-back">
              <LeftCircleOutlined className="logo-back" />
              Back to Home
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
