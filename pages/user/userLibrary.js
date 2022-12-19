import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { Pagination } from "antd";
import axios from "axios";
import LayoutPage from "../../components/layoutPage";
import { api } from "../../components/utils/api";
import FilterLibrary from "../../components/content/filterLibrary";
import InfoCard from "../../components/content/infoCard";
import { unauthPage } from "../../middleware/authorizationPage";

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);

  return { props: {} };
}
export default function UserLibrary() {
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
  const [currentPagination, setCurrentPagination] = useState(1);

  useEffect(() => {
    getKategori();
    getJudul();
    getTahun();
    getPenulis();
    getBook(filter);
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
              <Col md={12} xs={12}>
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
                          lg={3}
                          md={4}
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
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
UserLibrary.getLayout = function getLayout(page) {
  return <LayoutPage>{page}</LayoutPage>;
};
