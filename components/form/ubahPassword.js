import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button, Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { api } from "../utils/api";
import { toast } from "react-toastify";

export default function FormUbah({ id }) {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData({ ...newData });
  };

  const handleSubmit = () => {
    const bodyRequest = {
      id: id,
      password: data.password,
      old_password: data.old_password,
    };
    axios.put(api + "putPassword", bodyRequest).then((res) => {
      form.resetFields();
      if (res.data.status == "00") {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      form={form}
      autoComplete="off"
    >
      <Form.Item
        label="Password Lama"
        name="old_password"
        rules={[
          {
            required: true,
            message: "Please input your old password!",
          },
        ]}
      >
        <Input.Password
          placeholder="Input your old password"
          name="old_password"
          onChange={(e) => handleChange(e)}
          prefix={<LockOutlined />}
          size="large"
          required
        />
      </Form.Item>
      <Form.Item
        label="Password Baru"
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
        label="Retype Password Baru"
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
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-login">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
