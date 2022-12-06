import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Card,
  Button,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { Pagination, Modal } from "antd";
import axios from "axios";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import swal from "sweetalert";
import LayoutPage from "../../components/layoutPage";
import { api } from "../../components/utils/api";
import { authPage } from "../../middleware/authorizationPage";
import FilterLibrary from "../../components/content/filterLibrary";
import InfoCard from "../../components/content/infoCard";

const { confirm } = Modal;

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);

  return { props: { token, id } };
}
export default function Library(props) {
  const [kategori, setKategori] = useState([]);
  const [title, setTitle] = useState([]);
  const [penulis, setPenulis] = useState([]);
  const [tahun, setTahun] = useState([]);
  const [book, setBook] = useState([]);
  const [filter, setFilter] = useState({
    kategori: "",
    judul: "",
    penulis: "",
    tahun: "",
    jenis: "",
  });
  const [keranjang, setKeranjang] = useState([]);
  const [currentPagination, setCurrentPagination] = useState(1);

  useEffect(() => {
    getKategori();
    getJudul();
    getTahun();
    getPenulis();
    getBook(filter);
    getKeranjang();
  }, []);

  const getKategori = () => {
    axios.get(api + "getKategori").then((res) => {
      const result = Object.values(res.data.data);
      result.map(
        (data) => (
          (data["label"] = data["nama"]), (data["value"] = data["key"])
        )
      );
      result.unshift({ value: "", label: "Semua Kategori" });
      setKategori(result);
    });
  };

  const getJudul = () => {
    axios.get(api + "getJudul").then((res) => {
      const result = Object.values(res.data.data);
      result.map(
        (data) => (
          (data["label"] = data["judul"]), (data["value"] = data["judul"])
        )
      );
      result.unshift({ value: "", label: "Semua Buku" });
      setTitle(result);
    });
  };

  const getPenulis = () => {
    axios.get(api + "getPenulis").then((res) => {
      const author = Object.values(res.data.data);
      author.map(
        (data) => (
          (data["label"] = data["penulis"]), (data["value"] = data["penulis"])
        )
      );
      author.unshift({ value: "", label: "Semua Penulis" });
      setPenulis(author);
    });
  };

  const getTahun = () => {
    axios.get(api + "getTahun").then((res) => {
      const result = Object.values(res.data.data);
      result.map(
        (data) => (
          (data["label"] = data["tahun"]), (data["value"] = data["tahun"])
        )
      );
      result.unshift({ value: "", label: "Semua Tahun" });
      setTahun(result);
    });
  };

  const getBook = (data) => {
    axios
      .get(api + "getBook", {
        params: {
          kategori: data.kategori,
          tahun: data.tahun,
          judul: data.judul,
          penulis: data.penulis,
          jenis: data.jenis,
        },
      })
      .then((res) => {
        setBook(res.data.data);
      });
  };

  const handleChange = (e, name) => {
    const newData = { ...filter };
    newData[name] = e;
    setFilter({ ...newData });
    getBook(newData);
  };

  const getKeranjang = () => {
    axios
      .get(api + "getKeranjang", {
        params: {
          id_user: props.id,
        },
      })
      .then((res) => {
        setKeranjang(res.data.data);
      });
  };

  const postKeranjang = (id_buku) => {
    const data = {
      id_buku: id_buku,
      id_user: props.id,
    };

    axios.post(api + "postKeranjang", data).then((res) => {
      if (res.data.status == "99") {
        swal({
          title: "Gagal Masuk Keranjang",
          text: res.data.message,
          icon: "error",
          button: false,
          timer: 2400,
        });
      } else {
        swal({
          title: "Sukses Masuk Keranjang",
          text: "Cek keranjang buku anda!",
          icon: "success",
          button: false,
          timer: 2400,
        });
      }
      getKeranjang();
    });
  };

  const deleteAllKeranjang = (status) => {
    axios.delete(api + "deleteAllKeranjang").then((res) => {
      if (status) {
        swal({
          title: "Sukses Bersihkan Keranjang",
          text: "Keranjang telah kosong!",
          icon: "success",
          button: false,
          timer: 1200,
        });
      }
      getKeranjang();
    });
  };

  const postPeminjaman = () => {
    const requestBody = {
      kode_pinjam: "KP-" + new Date().getTime(),
      id_user: props.id,
    };

    keranjang.map(
      (data) => (
        (data["kode_pinjam"] = requestBody.kode_pinjam),
        (data["id_user"] = requestBody.id_user)
      )
    );
    keranjang.map((data) =>
      axios.post(api + "postPeminjaman", data).then((res) => {
        swal({
          title: "BERHASIL!",
          text: res.data.message,
          icon: "success",
          button: false,
          timer: 1800,
        });
        deleteAllKeranjang(false);
      })
    );
  };

  const showConfirm = () => {
    confirm({
      title: "Yakin ingin melanjutkan peminjaman?",
      icon: <ExclamationCircleFilled />,
      content:
        "Perhatian! Setelah menekan tombol ok, buku akan segera diproses untuk persetujuan.",
      onOk() {
        postPeminjaman();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const deleteKeranjang = (key) => {
    axios
      .delete(api + "deleteKeranjang", {
        params: {
          key: key,
        },
      })
      .then((res) => {
        swal({
          title: "Sukses Hapus Buku!",
          text: "Cek keranjang anda.",
          icon: "success",
          button: false,
          timer: 1200,
        });
        getKeranjang();
      });
  };

  return (
    <div className="container-cashier bg-index">
      <Container>
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <h3 className="text-center">
              <b className="kasir-title">ONLINE LIBRARY</b>
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <img src="/images/logo.svg" alt="" width={200} />
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            <Row>
              <Col xl={6} md={12} xs={12}>
                <h4 className="ms-3">
                  <strong>Pencarian</strong>
                </h4>
                <Card className="card-library mb-5" style={{ padding: "20px" }}>
                  <FilterLibrary
                    kategori={kategori}
                    title={title}
                    penulis={penulis}
                    tahun={tahun}
                    handleChange={handleChange}
                  />
                </Card>
              </Col>
              <Col xl={6} md={12} xs={12}>
                <h4 className="ms-3">
                  <strong>Informasi</strong>
                </h4>
                <InfoCard />
              </Col>
            </Row>
            <Row className="row-cashier">
              <Col md={8}>
                <h4 className="ms-3">
                  <strong>Daftar Buku</strong>
                </h4>
                <Card className="card-library">
                  <Row>
                    {book
                      .slice(
                        (currentPagination - 1) * 10,
                        10 * currentPagination
                      )
                      .map((book, key) => (
                        <Col
                          lg={4}
                          md={6}
                          xs={6}
                          className="mb-4"
                          key={book.key}
                        >
                          <Card className="shadow card-book">
                            <Card.Img
                              variant="top"
                              className="card-image"
                              src={book.gambar}
                              alt="gambar"
                            />
                            <Card.Body>
                              <Card.Title tag="h5">{book.judul}</Card.Title>
                              <Card.Text
                                style={{
                                  fontFamily: "sans-serif",
                                  fontWeight: "bolder",
                                  fontSize: "16px",
                                  marginBottom: "5px",
                                  marginTop: "15px",
                                }}
                              >
                                {book.penulis} - {book.tahun}
                              </Card.Text>
                              <Card.Text
                                style={{ marginBottom: "5px", color: "blue" }}
                              >
                                <i>{book.jenis == 1 ? "Offline" : "Online"}</i>
                              </Card.Text>
                              <Card.Text>[{book.nama}]</Card.Text>
                            </Card.Body>
                            <Button
                              color="info"
                              className="btn-card"
                              type="button"
                              onClick={() => postKeranjang(book.key)}
                              disabled={book.stok ? false : true}
                            >
                              Pinjam
                            </Button>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Pagination
                      defaultCurrent={currentPagination}
                      current={currentPagination}
                      total={book?.length}
                      onShowSizeChange={(e) => console.log(e)}
                      onChange={(e) => setCurrentPagination(e)}
                      showSizeChanger={false}
                      showQuickJumper
                    />
                  </div>
                </Card>
              </Col>
              <Col md={4} className="mt-2 mb-5">
                <h4 className="ms-3">
                  <strong>Keranjang Buku</strong>
                </h4>
                <Card className="card-library">
                  <ListGroup>
                    {keranjang.map((keranjang) => (
                      <ListGroup.Item key={keranjang.key}>
                        <Row>
                          <Col xl={1} lg={1} md={1} xs={1}>
                            <Badge pill bg="success">
                              {keranjang.jumlah_buku}
                            </Badge>
                          </Col>
                          <Col xl={8} lg={8} md={10} xs={8}>
                            <h5>{keranjang.judul}</h5>
                            <p>
                              {keranjang.penulis} - {keranjang.tahun}
                            </p>
                          </Col>
                          <Col
                            xl={3}
                            lg={2}
                            md={12}
                            xs={3}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              variant="danger"
                              className="btn-delete"
                              onClick={() => deleteKeranjang(keranjang.key)}
                            >
                              <DeleteOutlined />
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                    <br />
                  </ListGroup>
                  <Row className="mt-3">
                    <Container>
                      <Button
                        variant="success"
                        className="btn-lanjut"
                        onClick={showConfirm}
                      >
                        Pinjam Buku
                      </Button>
                    </Container>
                  </Row>
                  <Row className="mt-3">
                    <Container>
                      <Button
                        variant="danger"
                        onClick={() => deleteAllKeranjang(true)}
                        className="btn-lanjut"
                      >
                        Bersihkan Keranjang
                      </Button>
                    </Container>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
Library.getLayout = function getLayout(page) {
  return <LayoutPage>{page}</LayoutPage>;
};
