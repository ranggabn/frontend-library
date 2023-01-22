import React from "react";
import LayoutPage from "../../../../components/layoutPage";
import { Card, Col, Container, Row } from "react-bootstrap";
import { authPage } from "../../../../middleware/authorizationPage";
import EditBuku from "../../../../components/form/editBuku";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  return { props: { token } };
}
export default function Edit() {
  return (
    <div className="bg-index">
      <Container style={{ paddingBottom: "50px" }}>
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <h3 className="text-center">
              <b className="kasir-title">Edit Buku</b>
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
              <EditBuku />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
Edit.getLayout = function getLayout(page) {
  return <LayoutPage>{page}</LayoutPage>;
};
