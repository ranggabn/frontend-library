import React from "react";
import { Form, Select } from "antd";
import { Col, Row } from "react-bootstrap";

export default function FilterLibrary({
  kategori,
  title,
  penulis,
  tahun,
  handleChange,
}) {
  return (
    <div className="filter-library" style={{ minHeight: "280px" }}>
      <Form layout="vertical">
        <Row>
          <Col xl={6} md={6} xs={12}>
            <Form.Item label="Kategori" name="kategori">
              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder="Search to Select"
                defaultValue={{
                  value: "",
                  label: "Semua Kategori",
                }}
                optionFilterProp="kategori"
                name="kategori"
                onChange={(e) => handleChange(e, "kategori")}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={kategori}
              />
            </Form.Item>
            <Form.Item label="Judul Buku" name="judul">
              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                defaultValue={{
                  value: "",
                  label: "Semua Buku",
                }}
                placeholder="Search to Select"
                optionFilterProp="judul"
                name="judul"
                onChange={(e) => handleChange(e, "judul")}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={title}
              />
            </Form.Item>
          </Col>
          <Col xl={6} md={6} xs={12}>
            <Form.Item label="Penulis" name="penulis">
              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder="Search to Select"
                defaultValue={{
                  value: "",
                  label: "Semua Penulis",
                }}
                optionFilterProp="penulis"
                name="penulis"
                onChange={(e) => handleChange(e, "penulis")}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={penulis}
              />
            </Form.Item>
            <Form.Item label="Tahun" name="tahun">
              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder="Search to Select"
                optionFilterProp="tahun"
                name="tahun"
                onChange={(e) => handleChange(e, "tahun")}
                defaultValue={{
                  value: "",
                  label: "Semua Tahun",
                }}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={tahun}
              />
            </Form.Item>
          </Col>
          <Col xl={6} md={6} xs={12}>
            <Form.Item label="Jenis" name="jenis">
              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                defaultValue={{
                  value: "",
                  label: "Semua Jenis",
                }}
                placeholder="Search to Select"
                optionFilterProp="jenis"
                name="jenis"
                onChange={(e) => handleChange(e, "jenis")}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "",
                    label: "Semua Jenis",
                  },
                  {
                    value: "2",
                    label: "Online",
                  },
                  {
                    value: "1",
                    label: "Offline",
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
