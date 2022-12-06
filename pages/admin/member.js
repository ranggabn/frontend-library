import axios from "axios";
import React, { useEffect, useState } from "react";
import LayoutPage from "../../components/layoutPage";
import TableMember from "../../components/table/tableMember";
import { api } from "../../components/utils/api";
import { authPage } from "../../middleware/authorizationPage";
import { Card, Col, Container, Row } from "react-bootstrap";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);

  return { props: { token, id } };
}
export default function Member() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMember();
  }, []);

  const getMember = () => {
    axios.get(api + "getMember").then((res) => {
      setData(res.data.data);
    });
  };

  return (
    <div className="bg-index">
      <Container style={{ paddingBottom: "50px" }}>
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <h3 className="text-center">
              <b className="kasir-title">Daftar Anggota</b>
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
              <TableMember data={data} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
Member.getLayout = function getLayout(page) {
  return <LayoutPage>{page}</LayoutPage>;
};
