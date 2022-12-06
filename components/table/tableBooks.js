import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Row } from "react-bootstrap";

export default function TableBooks({ data }) {
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
      title: "Judul",
      dataIndex: "judul",
      key: "judul",
      width: "20%",
      ...getColumnSearchProps("judul"),
    },
    {
      title: "Penulis",
      dataIndex: "penulis",
      key: "penulis",
      width: "15%",
      ...getColumnSearchProps("penulis"),
    },
    {
      title: "Tahun",
      dataIndex: "tahun",
      key: "tahun",
      width: "5%",
      ...getColumnSearchProps("tahun"),
    },
    {
      title: "Kategori",
      dataIndex: "nama",
      key: "nama",
      width: "10%",
      ...getColumnSearchProps("nama"),
    },
    {
      title: "Stok",
      dataIndex: "stok",
      key: "stok",
      width: "5%",
      ...getColumnSearchProps("stok"),
    },
    {
      title: "Jenis",
      key: "jenis",
      width: "10%",
      render: (text, record) => (
        <>{record.jenis == "1" ? <p>Offline</p> : <p>Online</p>}</>
      ),
    },
    {
      title: "Aksi",
      key: "aksi",
      width: "5%",
      render: () => (
        <>
          <Button className="btn-log" style={{ color: "white" }}>
            Detail
          </Button>
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
