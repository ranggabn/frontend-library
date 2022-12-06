import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Row } from "react-bootstrap";

export default function TablePeminjaman({ data }) {
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
      title: "Nama Lengkap",
      dataIndex: "nama_lengkap",
      key: "nama_lengkap",
      width: "15%",
      ...getColumnSearchProps("nama_lengkap"),
    },
    {
      title: "Jumlah Buku",
      dataIndex: "jumlah_pinjam",
      key: "jumlah_pinjam",
      width: "10%",
      ...getColumnSearchProps("jumlah_pinjam"),
    },
    {
      title: "Tanggal Pengajuan",
      dataIndex: "insert_date",
      key: "insert_date",
      width: "15%",
      ...getColumnSearchProps("insert_date"),
    },
    {
      title: "Nomor Telefon",
      dataIndex: "nomor_telefon",
      key: "nomor_telefon",
      width: "15%",
      ...getColumnSearchProps("nomor_telefon"),
    },
    {
      title: "Aksi",
      key: "aksi",
      width: "10%",
      render: () => (
        <Button className="btn-log" style={{ color: "white" }}>
          Detail
        </Button>
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
