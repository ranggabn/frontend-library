import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button, Form, Input, Upload } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LeftCircleOutlined,
  MailOutlined,
  HomeOutlined,
  FileOutlined,
  PhoneOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getBase64 } from "../../components/utils/getBase64";
import axios from "axios";
import { api } from "../../components/utils/api";
import qs from "querystring";
import { toast } from "react-toastify";
import Router from "next/router";
import Link from "next/link";

export default function Register() {
  const [form] = Form.useForm();
  const [data, setData] = useState({
    nama_lengkap: "",
    universitas: "",
    jurusan: "",
    nomor_telefon: "",
    email: "",
    password: "",
  });
  const [ktm, setKtm] = useState("");

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData({ ...newData });
  };

  const handleChangeImage = async (e) => {
    const image = await getBase64(e.file.originFileObj);
    setKtm(image);
  };

  const handleSubmit = () => {
    const bodyRequest = {
      nama_lengkap: data.nama_lengkap,
      universitas: data.universitas,
      jurusan: data.jurusan,
      nomor_telefon: data.nomor_telefon,
      email: data.email,
      password: data.password,
      ktm: ktm,
    };

    axios
      .post(api + "auth/api/v1/register", qs.stringify(bodyRequest))
      .then((res) => {
        toast.success("Pendaftaran Berhasil! Silahkan cek email anda.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        form.resetFields();
        setTimeout(() => {
          Router.push("/");
        }, 50);
      });
  };

  return (
    <>
      <Row>
        <Col className="col-form-login">
          <Row>
            <img src="/images/logo.svg" alt="" height={100} />
          </Row>
          <Row className="row-form">
            <Col xl={8} md={8} xs={8}>
              <Form
                layout="vertical"
                onFinish={handleSubmit}
                form={form}
                autoComplete="off"
              >
                <Form.Item
                  label="Nama Lengkap"
                  name="nama"
                  rules={[
                    {
                      required: true,
                      message: "Please input your fullname!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Input your fullname"
                    size="large"
                    name="nama_lengkap"
                    onChange={(e) => handleChange(e)}
                    prefix={<UserOutlined />}
                    required
                  />
                </Form.Item>
                <Form.Item
                  label="Universitas"
                  name="universitas"
                  rules={[
                    {
                      required: true,
                      message: "Please input your university!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Input your university"
                    size="large"
                    name="universitas"
                    onChange={(e) => handleChange(e)}
                    prefix={<HomeOutlined />}
                    required
                  />
                </Form.Item>
                <Form.Item
                  label="Jurusan"
                  name="jurusan"
                  rules={[
                    {
                      required: true,
                      message: "Please input your major!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Input your major"
                    size="large"
                    name="jurusan"
                    onChange={(e) => handleChange(e)}
                    prefix={<FileOutlined />}
                    required
                  />
                </Form.Item>
                <Form.Item
                  label="Nomor Telefon"
                  name="nomor_telefon"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Input your phone number"
                    size="large"
                    name="nomor_telefon"
                    onChange={(e) => handleChange(e)}
                    prefix={<PhoneOutlined />}
                    required
                  />
                </Form.Item>
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
                    prefix={<MailOutlined />}
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
                <Form.Item
                  label="Retype Password"
                  name="re_password"
                  rules={[
                    {
                      required: true,
                      message: "Please retype your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Retype your password"
                    name="retype_password"
                    onChange={(e) => handleChange(e)}
                    prefix={<LockOutlined />}
                    size="large"
                    required
                  />
                </Form.Item>
                <Form.Item
                  label="Kartu Mahasiswa"
                  name="ktm"
                  rules={[
                    {
                      required: true,
                      message: "Please upload your student card!",
                    },
                  ]}
                >
                  <Upload
                    listType="picture"
                    maxCount={1}
                    onChange={(e) => handleChangeImage(e)}
                    required
                  >
                    <Button
                      icon={<UploadOutlined />}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        minHeight: "80px",
                        minWidth: "100%",
                        borderStyle: "dotted",
                      }}
                    >
                      Upload Kartu Mahasiswa (JPG/PNG/JPEG)
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-login"
                  >
                    Register
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
        <Col className="dark-login">
          <img src="/images/user.svg" alt="" height={200} />
        </Col>
      </Row>
    </>
  );
}
