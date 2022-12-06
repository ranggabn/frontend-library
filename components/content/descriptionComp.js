import { Badge, Descriptions, Steps } from "antd";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import {
  HourglassOutlined,
  CheckCircleOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function DescriptionComp({ data }) {
  console.log(data);
  return (
    <>
      {data.map((data) => (
        <Row className="mt-5">
          <Col xl={3} md={3} xs={12}>
            <Card
              className="shadow card-body-toko"
              style={{ minHeight: "100%" }}
            >
              <Card.Img
                variant="top"
                className="card-image"
                src={data.gambar}
                alt="gambar"
              />
              <Card.Body>
                <Card.Title tag="h5">{data.judul}</Card.Title>
                <Card.Text
                  style={{
                    fontFamily: "sans-serif",
                    fontWeight: "bolder",
                    fontSize: "16px",
                    marginBottom: "5px",
                    marginTop: "15px",
                  }}
                >
                  {data.penulis} - {data.tahun}
                </Card.Text>
                <Card.Text style={{ marginBottom: "5px", color: "blue" }}>
                  <i>{data.jenis == 1 ? "Offline" : "Online"}</i>
                </Card.Text>
                <Card.Text>[{data.nama}]</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={9} md={9} xs={12}>
            <Row className="mt-3">
              <Col>
                <Steps
                  style={{ padding: "0px 30px" }}
                  items={[
                    {
                      title: "Diajukan",
                      status: "finish",
                      icon: <UserOutlined />,
                    },
                    {
                      title: "Disetujui",
                      status:
                        data.status > 1 && data.status < 6
                          ? "finish"
                          : data.status == 6 && data.status == 7
                          ? "error"
                          : data.status == 1
                          ? "wait"
                          : "process",
                      icon: <SolutionOutlined />,
                    },
                    {
                      title: "Diambil",
                      status:
                        data.status == 4 && data.status == 5
                          ? "finish"
                          : data.status < 3
                          ? "wait"
                          : data.status == 3
                          ? "process"
                          : "error",
                      icon: <HourglassOutlined />,
                    },
                    {
                      title: "Dikembalikan",
                      status:
                        data.status == 5
                          ? "finish"
                          : data.status < 5
                          ? "wait"
                          : "error",
                      icon: <CheckCircleOutlined />,
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Descriptions bordered>
                  <Descriptions.Item label="Kode Pinjam" span={3}>
                    {data.kode_pinjam}
                  </Descriptions.Item>
                  <Descriptions.Item label="Nama Peminjam" span={3}>
                    {data.nama_lengkap}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tanggal Pinjam" span={3}>
                    {data.insert_date}
                  </Descriptions.Item>
                  <Descriptions.Item label="Masa Pinjam">
                    {data.tanggal_approve}
                  </Descriptions.Item>
                  <Descriptions.Item label="s/d" span={2} className="desc-sd">
                    {data.tanggal_pengembalian}
                  </Descriptions.Item>
                  <Descriptions.Item label="Keterlambatan" span={3}>
                    {data.tanggal_pengembalian - data.tanggal_approve} Hari
                  </Descriptions.Item>
                  <Descriptions.Item label="Status" span={3}>
                    <Badge
                      status="processing"
                      text={
                        data.status == 1
                          ? "Menunggu Persetujuan"
                          : record.status == 2
                          ? "Disetujui"
                          : record.status == 3
                          ? "Belum Diambil"
                          : record.status == 4
                          ? "Diambil"
                          : record.status == 5
                          ? "Dikembalikan"
                          : record.status == 6
                          ? "Dibatalkan"
                          : record.status == 7
                          ? "Tidak Disetujui"
                          : ""
                      }
                    />
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </>
  );
}
