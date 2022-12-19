import React, { useEffect, useState } from "react";
import { Button, Form, Image, Input } from "antd";
import {
  UserOutlined,
  MailOutlined,
  HomeOutlined,
  FileOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { api } from "../utils/api";
import swal from "sweetalert";

export default function TableDetail({ id }) {
  const [form] = Form.useForm();
  const [ktm, setKtm] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getMember();
  }, []);

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
        setKtm(datas.ktm);
        setStatus(datas.status_forgot);
        form.setFieldsValue({
          nama_lengkap: datas.nama_lengkap,
          universitas: datas.universitas,
          jurusan: datas.jurusan,
          nomor_telefon: datas.nomor_telefon,
          email: datas.email,
          jenis: datas.jenis,
          ktm: datas.ktm,
        });
      });
  };

  const putForgot = () => {
    axios.put(api + "putForgot", data).then((res) => {
      swal({
        title: res.data.message,
        text: "Silahkan login!",
        icon: "success",
        button: false,
        timer: 1200,
      });
      getMember();
    });
  };

  return (
    <Form layout="vertical" form={form} autoComplete="off">
      <Form.Item label="Nama Lengkap" name="nama_lengkap">
        <Input
          placeholder="Input your fullname"
          size="large"
          name="nama_lengkap"
          prefix={<UserOutlined />}
          disabled
        />
      </Form.Item>
      <Form.Item label="Universitas" name="universitas">
        <Input
          placeholder="Input your university"
          size="large"
          name="universitas"
          prefix={<HomeOutlined />}
          disabled
        />
      </Form.Item>
      <Form.Item label="Jurusan" name="jurusan">
        <Input
          placeholder="Input your major"
          size="large"
          name="jurusan"
          prefix={<FileOutlined />}
          disabled
        />
      </Form.Item>
      <Form.Item label="Nomor Telefon" name="nomor_telefon">
        <Input
          placeholder="Input your phone number"
          size="large"
          name="nomor_telefon"
          prefix={<PhoneOutlined />}
          disabled
        />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input
          placeholder="Input your email"
          size="large"
          name="email"
          prefix={<MailOutlined />}
          disabled
        />
      </Form.Item>
      <Form.Item label="Kartu Mahasiswa" name="ktm">
        <Image width={200} src={ktm} alt="ktm" />
      </Form.Item>
      {status == "1" && (
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="btn-log"
            style={{ color: "white", minWidth: "100%" }}
            onClick={() => putForgot()}
          >
            Perubahan Password
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}
