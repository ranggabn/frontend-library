import React from "react";
import TambahBuku from "../../../components/form/tambahBuku";
import LayoutPage from "../../../components/layoutPage";
import { authPage } from "../../../middleware/authorizationPage";
import { Card, Col, Container, Row } from "react-bootstrap";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  return { props: { token } };
}
export default function New() {
  return (
    <div className="bg-index">
      <Container style={{ paddingBottom: "50px" }}>
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <h3 className="text-center">
              <b className="kasir-title">Tambah Buku</b>
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
            <Card style={{ padding: "20px", marginTop: "30px" }}>
              <TambahBuku />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
New.getLayout = function getLayout(page) {
  return <LayoutPage>{page}</LayoutPage>;
};
