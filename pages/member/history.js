import React, { useEffect, useState } from "react";
import LayoutPage from "../../components/layoutPage";
import { Card, Col, Container, Row } from "react-bootstrap";
import DescriptionComp from "../../components/content/descriptionComp";
import TableHistory from "../../components/table/tableHistory";
import axios from "axios";
import { api } from "../../components/utils/api";
import { authPage } from "../../middleware/authorizationPage";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);

  return { props: { token, id } };
}
export default function History(props) {
  const [data, setData] = useState([]);
  const [last, setLast] = useState([]);
  useEffect(() => {
    getPeminjaman();
    getLastPeminjaman();
  }, []);

  const getPeminjaman = () => {
    axios
      .get(api + "getPeminjaman", {
        params: {
          id_user: props.id,
        },
      })
      .then((res) => {
        setData(res.data.data);
      });
  };

  const getLastPeminjaman = () => {
    axios
      .get(api + "getLastPeminjaman", {
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
              <b className="kasir-title">Data Pinjaman Buku</b>
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
              <DescriptionComp data={last} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="ms-3" style={{ marginTop: "50px" }}>
              <strong>History</strong>
            </h4>
            <Card style={{ padding: "20px" }}>
              <TableHistory data={data} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
History.getLayout = function getLayout(page) {
  return <LayoutPage>{page}</LayoutPage>;
};
