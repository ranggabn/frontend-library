import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import LayoutPage from "../../components/layoutPage";
import { authPage } from "../../middleware/authorizationPage";
import axios from "axios";
import { api } from "../../components/utils/api";
import { Empty } from "antd";
import { convertDate } from "../../components/utils/convertDate";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);

  return { props: { token, id } };
}
export default function OnlineBook(props) {
  const [last, setLast] = useState([]);
  const now = new Date();

  useEffect(() => {
    getLastPeminjaman();
  }, []);

  const getLastPeminjaman = async () => {
    axios
      .get(api + "getLastPeminjamanOnline", {
        params: {
          id_user: props.id,
        },
      })
      .then((res) => {
        setLast(res.data.data);
      });
  };

  return (
    <div className="bg-index">
      <Container style={{ paddingBottom: "50px" }}>
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <h3 className="text-center">
              <b className="kasir-title">Pinjaman E-Book</b>
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
        <Row>
          <Col>
            {last.length ? (
              <Card style={{ padding: "20px", marginTop: "30px" }}>
                {last.map((data) => (
                  <div key={data.key}>
                    <Row>
                      <Col xl={2} md={3} xs={4}>
                        <p>Kode Pinjam</p>
                      </Col>
                      <Col xl={1} md={1} xs={1}>
                        <p>:</p>
                      </Col>
                      <Col xl={9} md={8} xs={7}>
                        <p>{data.kode_pinjam}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={2} md={3} xs={4}>
                        <p>Judul Buku</p>
                      </Col>
                      <Col xl={1} md={1} xs={1}>
                        <p>:</p>
                      </Col>
                      <Col xl={9} md={8} xs={7}>
                        <p>{data.judul}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={2} md={3} xs={4}>
                        <p>Masa Pinjam</p>
                      </Col>
                      <Col xl={1} md={1} xs={1}>
                        <p>:</p>
                      </Col>
                      <Col xl={9} md={8} xs={7}>
                        <p>
                          {convertDate(data.tanggal_approve) +
                            " - " +
                            convertDate(data.tanggal_pengembalian)}
                        </p>
                      </Col>
                    </Row>
                    <embed
                      src={data.pdf}
                      style={{ minHeight: "800px", width: "100%" }}
                    />
                  </div>
                ))}
              </Card>
            ) : (
              <Card style={{ padding: "20px", marginTop: "30px" }}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
OnlineBook.getLayout = function getLayout(page) {
  return <LayoutPage>{page}</LayoutPage>;
};
