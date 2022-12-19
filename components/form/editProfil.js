import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import {
  UserOutlined,
  MailOutlined,
  HomeOutlined,
  FileOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { api } from "../utils/api";
import { toast } from "react-toastify";

export default function FormEdit({ id }) {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    getMember();
  }, []);

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData({ ...newData });
  };

  const getMember = () => {
    axios
      .get(api + "getMemberById", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        const datas = res.data.data;
        setData(res.data.data);
        form.setFieldsValue({
          nama_lengkap: datas.nama_lengkap,
          universitas: datas.universitas,
          jurusan: datas.jurusan,
          nomor_telefon: datas.nomor_telefon,
          email: datas.email,
        });
      });
  };

  const handleSubmit = () => {
    axios.put(api + "putProfil", data).then((res) => {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      getMember();
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
        label="Nama Lengkap"
        name="nama_lengkap"
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
      <Form.Item label="Universitas" name="universitas">
        <Input
          placeholder="Input your university"
          size="large"
          name="universitas"
          onChange={(e) => handleChange(e)}
          prefix={<HomeOutlined />}
          disabled
        />
      </Form.Item>
      <Form.Item label="Jurusan" name="jurusan">
        <Input
          placeholder="Input your major"
          size="large"
          name="jurusan"
          onChange={(e) => handleChange(e)}
          prefix={<FileOutlined />}
          disabled
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
