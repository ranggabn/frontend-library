import { Button } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import swal from "sweetalert";
import LayoutPage from "../../../components/layoutPage";
import TableDetailPinjam from "../../../components/table/tableDetailPinjam";
import { api } from "../../../components/utils/api";
import { authPage } from "../../../middleware/authorizationPage";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);

  return { props: { token, id } };
}
export default function DetailPeminjaman() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { kode_pinjam } = router.query;

  useEffect(() => {
    getPeminjaman();
  }, []);

  const getPeminjaman = () => {
    axios
      .get(api + "getPeminjamById", {
        params: {
          kode_pinjam: kode_pinjam,
        },
      })
      .then((res) => {
        setData(res.data.data);
      });
  };

  const changeStatus = (record) => {
    if (record.jenis == "1") {
      record.status = 3;
    } else {
      record.status = 4;
    }
    axios.put(api + "changeStatus", record).then((res) => {
      getPeminjaman();
      swal({
        title: "BERHASIL!",
        text: res.data.message,
        icon: "success",
        button: false,
        timer: 1800,
      });
    });
  };

  const notAccept = (record, status) => {
    record.status = status;
    axios.put(api + "changeStatus", record).then((res) => {
      getPeminjaman();
      swal({
        title: "BERHASIL!",
        text: res.data.message,
        icon: "success",
        button: false,
        timer: 1800,
      });
    });
  };

  return (
    <div className="bg-index">
      <Container style={{ paddingBottom: "50px" }}>
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <h3 className="text-center">
              <b className="kasir-title">Detail Peminjaman Buku</b>
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <img src="/images/online-logo.png" alt="" width={200} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ padding: "20px", marginTop: "30px" }}>
              <Row>
                <Col xl={2} md={3} xs={4}>
                  <p>Kode Pinjam</p>
                </Col>
                <Col xl={1} md={1} xs={1}>
                  <p>:</p>
                </Col>
                <Col xl={9} md={8} xs={7}>
                  <p>{data[0]?.kode_pinjam}</p>
                </Col>
              </Row>
              <Row>
                <Col xl={2} md={3} xs={4}>
                  <p>Nama Lengkap</p>
                </Col>
                <Col xl={1} md={1} xs={1}>
                  <p>:</p>
                </Col>
                <Col xl={9} md={8} xs={7}>
                  <p>{data[0]?.nama_lengkap}</p>
                </Col>
              </Row>
              <Row>
                <Col xl={2} md={3} xs={4}>
                  <p>Nomor Telefon</p>
                </Col>
                <Col xl={1} md={1} xs={1}>
                  <p>:</p>
                </Col>
                <Col xl={9} md={8} xs={7}>
                  <p>{data[0]?.nomor_telefon}</p>
                </Col>
              </Row>
              <Row>
                <Col xl={2} md={3} xs={4}>
                  <p>Universitas Peminjam</p>
                </Col>
                <Col xl={1} md={1} xs={1}>
                  <p>:</p>
                </Col>
                <Col xl={9} md={8} xs={7}>
                  <p>{data[0]?.universitas}</p>
                </Col>
              </Row>
              <Row>
                <Col xl={2} md={3} xs={4}>
                  <p>Jurusan Peminjam</p>
                </Col>
                <Col xl={1} md={1} xs={1}>
                  <p>:</p>
                </Col>
                <Col xl={9} md={8} xs={7}>
                  <p>{data[0]?.jurusan}</p>
                </Col>
              </Row>
              <TableDetailPinjam
                data={data}
                changeStatus={changeStatus}
                notAccept={notAccept}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
DetailPeminjaman.getLayout = function getLayout(page) {
  return <LayoutPage>{page}</LayoutPage>;
};
