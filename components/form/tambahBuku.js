import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getBase64 } from "../../components/utils/getBase64";
import axios from "axios";
import { api } from "../../components/utils/api";
import qs from "querystring";
import swal from "sweetalert";
import Router from "next/router";

const { Option } = Select;

export default function TambahBuku() {
  const [form] = Form.useForm();
  const [data, setData] = useState({
    judul: "",
    penulis: "",
    tahun: "",
    stok: "",
  });
  const [image, setImage] = useState("");
  const [pdf, setPdf] = useState("");
  const [kategori, setKategori] = useState([]);
  const [idKategori, setIdKategori] = useState("");
  const [jenis, setJenis] = useState("");

  useEffect(() => {
    getKategori();
  }, []);

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData({ ...newData });
  };

  const handleChangeImage = async (e) => {
    const image = await getBase64(e.file.originFileObj);
    setImage(image);
  };

  const handleChangePdf = async (e) => {
    const pdf = await getBase64(e.file.originFileObj);
    setPdf(pdf);
  };

  const getKategori = () => {
    axios.get(api + "getKategori").then((res) => {
      setKategori(res.data.data);
    });
  };

  const handleSubmit = () => {
    const bodyRequest = {
      judul: data.judul,
      penulis: data.penulis,
      tahun: data.tahun,
      stok: data.stok,
      jenis: jenis,
      id_kategori: idKategori,
      gambar: image,
      pdf: pdf,
    };

    axios.post(api + "postBuku", qs.stringify(bodyRequest)).then((res) => {
      swal({
        title: "BERHASIL!",
        text: res.data.message,
        icon: "success",
        button: false,
        timer: 1800,
      });
      form.resetFields();
      setTimeout(() => {
        Router.push("/admin/books");
      }, 50);
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
        label="Judul Buku"
        name="judul"
        rules={[
          {
            required: true,
            message: "Harap masukkan judul buku!",
          },
        ]}
      >
        <Input
          placeholder="Ex: Rekayasa Perangkat Lunak"
          size="large"
          name="judul"
          onChange={(e) => handleChange(e)}
          prefix={<BookOutlined />}
          required
        />
      </Form.Item>
      <Form.Item
        label="Penulis"
        name="penulis"
        rules={[
          {
            required: true,
            message: "Harap masukkan nama penulis!",
          },
        ]}
      >
        <Input
          placeholder="Ex: John Stone"
          size="large"
          name="penulis"
          onChange={(e) => handleChange(e)}
          prefix={<UserOutlined />}
          required
        />
      </Form.Item>
      <Form.Item
        label="Tahun"
        name="tahun"
        rules={[
          {
            required: true,
            message: "Harap masukkan tahun terbit!",
          },
        ]}
      >
        <Input
          placeholder="Ex: 2010"
          size="large"
          name="tahun"
          onChange={(e) => handleChange(e)}
          prefix={<CalendarOutlined />}
          required
        />
      </Form.Item>
      <Form.Item
        label="Stok"
        name="stok"
        rules={[
          {
            required: true,
            message: "Harap masukkan jumlah buku!",
          },
        ]}
      >
        <Input
          placeholder="Ex: 4"
          size="large"
          name="stok"
          onChange={(e) => handleChange(e)}
          prefix={<BookOutlined />}
          required
        />
      </Form.Item>
      <Form.Item
        label="Kategori"
        name="id_kategori"
        rules={[
          {
            required: true,
            message: "Harap isi kategori !",
          },
        ]}
      >
        <Select
          defaultValue="0"
          name="id_kategori"
          size="large"
          onChange={(e) => setIdKategori(e)}
          required
        >
          <Option value="0" disabled>
            Pilih Kategori
          </Option>
          {kategori.map((kategori) => (
            <Option value={kategori.key} key={kategori.key}>
              {kategori.nama}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Jenis"
        name="jenis"
        rules={[
          {
            required: true,
            message: "Harap isi jenis buku !",
          },
        ]}
      >
        <Select
          defaultValue="0"
          name="jenis"
          size="large"
          onChange={(e) => setJenis(e)}
          required
        >
          <Option value="0" disabled>
            Pilih Jenis
          </Option>
          <Option value="1">Offline</Option>
          <Option value="2">Online</Option>
        </Select>
      </Form.Item>

      <Form.Item label="File E-Book" name="pdf">
        <Upload
          listType="file"
          name="pdf"
          maxCount={1}
          onChange={(e) => handleChangePdf(e)}
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
            Upload E-Book (PDF)
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item
        label="Foto Buku"
        name="image"
        rules={[
          {
            required: true,
            message: "Harap upload foto buku !",
          },
        ]}
      >
        <Upload
          listType="picture"
          name="image"
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
            Upload Foto Buku (JPG/PNG/JPEG) - Max. 2MB
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-login">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
