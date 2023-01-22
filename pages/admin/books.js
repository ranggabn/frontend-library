import React, { useEffect, useState } from "react";
import TableBooks from "../../components/table/tableBooks";
import axios from "axios";
import LayoutPage from "../../components/layoutPage";
import { api } from "../../components/utils/api";
import { authPage } from "../../middleware/authorizationPage";
import { Card, Col, Container, Row } from "react-bootstrap";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Router from "next/router";

export async function getServerSideProps(ctx) {
  const { token, id } = await authPage(ctx);

  return { props: { token, id } };
}
export default function Books() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    axios.get(api + "getAllBook").then((res) => {
      setData(res.data.data);
    });
  };

  const handleClick = () => {
    Router.push("/admin/buku/new");
  };

  return (
    <div className="bg-index">
      <Container style={{ paddingBottom: "50px" }}>
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <h3 className="text-center">
              <b className="kasir-title">Daftar Buku</b>
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
              <Row className="mb-4">
                <Col xl={12} md={12} xs={12}>
                  <Button className="btn-add" onClick={handleClick}>
                    <PlusSquareOutlined />
                    Tambah Buku
                  </Button>
                </Col>
              </Row>
              <TableBooks data={data} getBooks={getBooks} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
Books.getLayout = function getLayout(page) {
  return <LayoutPage>{page}</LayoutPage>;
};
