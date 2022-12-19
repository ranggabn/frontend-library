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
import { unauthPage } from "../../middleware/authorizationPage";

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);

  return { props: {} };
}
export default function Forgot() {
  const [form] = Form.useForm();
  const [data, setData] = useState({
    email: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    const bodyRequest = {
      email: data.email,
    };

    axios.post(api + "postForgot", qs.stringify(bodyRequest)).then((res) => {
      if (res.data.status == "00") {
        setError(false);
        form.resetFields();
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          Router.push("/");
        }, 50);
      } else {
        form.resetFields();
        setMessage(res.data.message);
        setError(true);
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
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <h3 className="text-center">
              <b className="kasir-title">FORGOT PASSWORD</b>
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <img src="/images/logo.svg" alt="" height={100} />
            </div>
          </Col>
        </Row>
        <Row className="row-form">
          <Col xl={8} md={8} xs={8}>
            <h4>Ketentuan Lupa Password</h4>
            <ol>
              <li>Isi formulir dibawah ini.</li>
              <li>
                Hubungi pengurus perpustakaan ke nomor <b>08561231274</b>{" "}
                (Whatsapp). Dengan format dibawah ini:
              </li>
            </ol>
            <b>
              <p style={{ marginBottom: "0px", marginLeft: "15px" }}>
                Pengajuan Ubah Password
              </p>
            </b>
            <ul className="mb-4">
              <li>
                Email : <i>xxxxxx@xxxx.com</i>
              </li>
              <li>
                Nama Lengkap : <i>xxxxxxxxxxx</i>
              </li>
              <li>
                Nomor Telefon : <i>08xxxxxxx123</i>
              </li>
              <li>
                KTM :{" "}
                <b>
                  <i>Foto KTM anda</i>
                </b>
              </li>
            </ul>
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
                    type: "email",
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
              <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-login">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="row-index">
            <Link href="/auth/login" className="row-index a-back">
              <LeftCircleOutlined className="logo-back" />
              Back to Login
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
