import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Col, Row } from "react-bootstrap";

export default function TableHistory({ data }) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              clearFilters &&
              handleReset(clearFilters) &&
              handleSearch(selectedKeys, confirm, dataIndex)
            }
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Kode Pinjam",
      dataIndex: "kode_pinjam",
      key: "kode_pinjam",
      width: "10%",
      ...getColumnSearchProps("kode_pinjam"),
    },
    {
      title: "Judul Buku",
      dataIndex: "judul",
      key: "judul",
      width: "15%",
      ...getColumnSearchProps("judul"),
    },
    {
      title: "Tanggal Pinjam",
      dataIndex: "insert_date",
      key: "insert_date",
      width: "10%",
      ...getColumnSearchProps("insert_date"),
    },
    {
      title: "Tanggal Disetujui",
      dataIndex: "tanggal_approve",
      key: "tanggal_approve",
      width: "15%",
      ...getColumnSearchProps("tanggal_approve"),
    },
    {
      title: "Tanggal Pengembalian",
      dataIndex: "tanggal_pengembalian",
      key: "tanggal_pengembalian",
      width: "15%",
      ...getColumnSearchProps("tanggal_pengembalian"),
    },
    {
      title: "Status",
      key: "status",
      width: "10%",
      render: (text, record) => (
        <>
          <Row className="row-btn-table">
            <Col lg={12} md={12} className="col-btn">
              <p>
                {record.status == 1
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
                  : ""}
              </p>
            </Col>
          </Row>
        </>
      ),
    },
  ];
  return (
    <>
      <Row className="row-table">
        <Table columns={columns} dataSource={data} />
      </Row>
    </>
  );
}
