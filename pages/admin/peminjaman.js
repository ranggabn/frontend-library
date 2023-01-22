import axios from "axios";
import React, { useEffect, useState } from "react";
import LayoutPage from "../../components/layoutPage";
import { api } from "../../components/utils/api";
import { authPage } from "../../middleware/authorizationPage";
import { Card, Col, Container, Row } from "react-bootstrap";
import TablePeminjaman from "../../components/table/tablePeminjaman";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);

  return { props: { token, id } };
}
export default function Peminjaman() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getListPeminjam();
  }, []);

  const getListPeminjam = () => {
    axios.get(api + "getListPeminjam").then((res) => {
      setData(res.data.data);
    });
  };

  return (
    <div className="bg-index">
      <Container style={{ paddingBottom: "50px" }}>
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <h3 className="text-center">
              <b className="kasir-title">Daftar Peminjaman Buku</b>
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
              <TablePeminjaman data={data} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
Peminjaman.getLayout = function getLayout(page) {
  return <LayoutPage>{page}</LayoutPage>;
};
