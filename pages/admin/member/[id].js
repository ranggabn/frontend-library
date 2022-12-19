import { useRouter } from "next/router";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import TableDetail from "../../../components/form/detailMember";
import LayoutPage from "../../../components/layoutPage";
import { authPage } from "../../../middleware/authorizationPage";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  return { props: { token } };
}
export default function DetailMember() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="bg-index">
      <Container style={{ paddingBottom: "50px" }}>
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <h3 className="text-center">
              <b className="kasir-title">Detail Member</b>
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
              <TableDetail id={id} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
DetailMember.getLayout = function getLayout(page) {
  return <LayoutPage>{page}</LayoutPage>;
};
