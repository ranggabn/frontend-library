import React, { useEffect, useState } from "react";
import { Button, Form, Image, Input, Select, Upload } from "antd";
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
import { useRouter } from "next/router";

const { Option } = Select;

export default function EditBuku() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { key } = router.query;
  const [data, setData] = useState({
    judul: "",
    penulis: "",
    tahun: "",
    stok: "",
  });
  const [image, setImage] = useState("");
  const [imageStat, setImageStat] = useState(false);
  const [pdfStat, setPdfStat] = useState(false);
  const [kategori, setKategori] = useState([]);
  const [idKategori, setIdKategori] = useState("");
  const [pdf, setPdf] = useState("");
  const [jenis, setJenis] = useState("");

  useEffect(() => {
    getKategori();
    getBook();
  }, []);

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData({ ...newData });
  };

  const handleChangePdf = async (e) => {
    if (e.fileList.length) {
      setPdfStat(true);
    } else {
      setPdfStat(false);
    }
    const pdf = await getBase64(e.file.originFileObj);
    setPdf(pdf);
  };

  const handleChangeImage = async (e) => {
    if (e.fileList.length) {
      setImageStat(true);
    } else {
      setImageStat(false);
    }
    const image = await getBase64(e.file.originFileObj);
    setImage(image);
  };

  const getBook = () => {
    axios
      .get(api + "getBookById", {
        params: {
          id_buku: key,
        },
      })
      .then((res) => {
        setData(res.data.data);
        const datas = res.data.data;
        form.setFieldsValue({
          judul: datas.judul,
          penulis: datas.penulis,
          tahun: datas.tahun,
          stok: datas.stok,
          id_kategori: datas.id_kategori,
          jenis: datas.jenis,
          image: datas.gambar,
        });
      });
  };

  const getKategori = () => {
    axios.get(api + "getKategori").then((res) => {
      setKategori(res.data.data);
    });
  };

  const handleSubmit = () => {
    const bodyRequest = {
      key: key,
      judul: data.judul,
      penulis: data.penulis,
      tahun: data.tahun,
      stok: data.stok,
      jenis: jenis ? jenis : data.jenis,
      id_kategori: idKategori ? idKategori : data.id_kategori,
      gambar: image ? image : data.gambar,
      pdf: pdf ? pdf : data.pdf,
    };

    axios
      .put(api + "putBuku", qs.stringify(bodyRequest))
      .then((res) => {
        swal({
          title: "Sukses Update Data",
          text: "Cek Daftar Barang!",
          icon: "success",
          button: false,
          timer: 1200,
        });
        setTimeout(() => {
          router.push("/admin/books");
        }, 100);
      })
      .catch((error) => {
        swal({
          title: "Gagal Update Data",
          text: "Ukuran Foto Terlalu Besar!",
          icon: "error",
          button: false,
          timer: 1800,
        });
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
            {pdfStat ? pdf : data.judul + ".pdf"}
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
        <Image
          width={200}
          src={imageStat ? image : data.gambar}
          className="mt-3"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-login">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
